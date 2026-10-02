import type { TourProvider, TourSearchParams, TourResult, DictionaryData } from './types';
import { XMLParser } from 'fast-xml-parser';

const ENDPOINT = process.env.ALEAN_ENDPOINT || 'https://ksb3.alean.ru/webservice/ewebsvc.dll/soap/';
const LOGIN = process.env.ALEAN_LOGIN || '';
const PASSWORD = process.env.ALEAN_PASSWORD || '';

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: '@_',
  textNodeName: '#text',
});

let dictCache: { data: DictionaryData; expires: number } | null = null;

async function getSoapResponse(xml: string, action: string): Promise<string> {
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'text/xml; charset=utf-8',
      SOAPAction: `"${action}"`,
    },
    body: xml,
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error(`Ошибка запроса к провайдеру: ${res.status}`);
  }

  return await res.text();
}

async function getSessionId(): Promise<string> {
  if (!LOGIN || !PASSWORD) {
    throw new Error('Отсутствуют учетные данные ALEAN_LOGIN или ALEAN_PASSWORD в .env.local');
  }

  const loginXml = `<?xml version="1.0" encoding="utf-8"?>
<SOAP-ENV:Envelope xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/" xmlns:SOAP-ENC="http://schemas.xmlsoap.org/soap/encoding/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
  <SOAP-ENV:Body>
    <m:Login xmlns:m="urn:webservice-electrasoft-ru:types-ewsServerIntf-IewsServer" SOAP-ENV:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
      <ConnectionID xsi:type="xsd:string"></ConnectionID>
      <UserAlias xsi:type="xsd:string">${LOGIN}</UserAlias>
      <Password xsi:type="xsd:string">${PASSWORD}</Password>
      <Language xsi:type="xsd:string">RU</Language>
      <ProfileID xsi:type="xsd:string"></ProfileID>
      <ContextXML xsi:type="xsd:string"></ContextXML>
      <Timeout xsi:type="xsd:unsignedInt">900000</Timeout>
    </m:Login>
  </SOAP-ENV:Body>
</SOAP-ENV:Envelope>`;

  const text = await getSoapResponse(loginXml, 'urn:webservice-electrasoft-ru:types-ewsServerIntf-IewsServer#Login');
  const parsed = parser.parse(text);
  const sessionId = parsed?.['SOAP-ENV:Envelope']?.['SOAP-ENV:Body']?.['m:LoginResponse']?.SessionID;

  if (!sessionId) {
    throw new Error('Не удалось получить SessionID. Проверьте логин и пароль.');
  }
  return sessionId;
}

export const aleanProvider: TourProvider = {
  id: 'alean',
  name: 'Алеан',
  isActive: false,

  async getDictionaries(): Promise<DictionaryData> {
    if (dictCache && dictCache.expires > Date.now()) {
      return dictCache.data;
    }

    try {
      const sessionId = await getSessionId();

      const geoXml = `<?xml version="1.0" encoding="utf-8"?>
<SOAP-ENV:Envelope xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/" xmlns:SOAP-ENC="http://schemas.xmlsoap.org/soap/encoding/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
  <SOAP-ENV:Body>
    <m:GetGeographyTreeList xmlns:m="urn:webservice-electrasoft-ru:types-twsReservation2ServiceIntf-ItwsReservation2Service" SOAP-ENV:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
      <SessionID xsi:type="xsd:string">${sessionId}</SessionID>
    </m:GetGeographyTreeList>
  </SOAP-ENV:Body>
</SOAP-ENV:Envelope>`;

      const geoText = await getSoapResponse(geoXml, 'urn:webservice-electrasoft-ru:types-twsReservation2ServiceIntf-ItwsReservation2Service#GetGeographyTreeList');
      const geoParsed = parser.parse(geoText);

      const cities: { cid: string; name: string }[] = [];

      function extractCities(node: any) {
        if (!node) return;
        if (Array.isArray(node)) {
          node.forEach(extractCities);
          return;
        }
        if (node.City) {
          const cityNodes = Array.isArray(node.City) ? node.City : [node.City];
          cityNodes.forEach((c: any) => {
            const cid = c['@_CID'];
            const name = c['@_Name'] || c['Name']?.['#text'] || 'Город';
            if (cid && name && !String(cid).toLowerCase().includes('test')) {
              cities.push({ cid: String(cid), name: String(name) });
            }
          });
        }
        Object.keys(node).forEach((key) => {
          const value = node[key];
          if (typeof value === 'object' && key !== 'Name') {
            extractCities(value);
          }
        });
      }

      const geoBody = geoParsed?.['SOAP-ENV:Envelope']?.['SOAP-ENV:Body'];
      if (geoBody) extractCities(geoBody);

      const uniqueCities = Array.from(new Map(cities.map((item) => [item.cid, item])).values()).sort((a, b) =>
        a.name.localeCompare(b.name, 'ru')
      );

      const toursXml = `<?xml version="1.0" encoding="utf-8"?>
<SOAP-ENV:Envelope xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/" xmlns:SOAP-ENC="http://schemas.xmlsoap.org/soap/encoding/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
  <SOAP-ENV:Body>
    <m:GetAvailableTourList xmlns:m="urn:webservice-electrasoft-ru:types-twsReservation2ServiceIntf-ItwsReservation2Service" SOAP-ENV:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
      <SessionID xsi:type="xsd:string">${sessionId}</SessionID>
    </m:GetAvailableTourList>
  </SOAP-ENV:Body>
</SOAP-ENV:Envelope>`;

      const toursText = await getSoapResponse(toursXml, 'urn:webservice-electrasoft-ru:types-twsReservation2ServiceIntf-ItwsReservation2Service#GetAvailableTourList');
      const toursParsed = parser.parse(toursText);
      const toursBody = toursParsed?.['SOAP-ENV:Envelope']?.['SOAP-ENV:Body'];

      let availableTours: { cid: string; name: string }[] = [];
      if (toursBody) {
        const response = toursBody?.['m:GetAvailableTourListResponse']?.return;
        const innerParsed = typeof response === 'string' ? parser.parse(response) : response;
        const tourList = innerParsed?.AvailableTourList?.item || innerParsed?.AvailableTourList?.Tour || [];
        const toursArray = Array.isArray(tourList) ? tourList : tourList ? [tourList] : [];

        availableTours = toursArray
          .map((t: any) => ({
            cid: t['@_CID'] || t['CID'],
            name: t['@_Name'] || t['Name']?.['#text'] || t['CID'],
          }))
          .filter((t: any) => t.cid && !String(t.cid).toLowerCase().includes('test'));
      }

      const uniqueDestinations = Array.from(new Map(availableTours.map((item) => [item.cid, item])).values()).sort((a, b) =>
        a.name.localeCompare(b.name, 'ru')
      );

      const finalCities = uniqueCities.length > 0 ? uniqueCities : [{ cid: 'moskva', name: 'Москва' }];
      const finalDestinations = uniqueDestinations.length > 0 ? uniqueDestinations : [{ cid: 'russia', name: 'Россия (все туры)' }];

      dictCache = {
        data: { departureCities: finalCities, destinations: finalDestinations },
        expires: Date.now() + 24 * 60 * 60 * 1000,
      };

      return dictCache.data;
    } catch (error) {
      console.error('Ошибка загрузки словарей Алеан:', error);
      return {
        departureCities: [{ cid: 'moskva', name: 'Москва' }],
        destinations: [{ cid: 'russia', name: 'Россия' }],
      };
    }
  },

  async searchTours(params: TourSearchParams): Promise<TourResult[]> {
    if (!LOGIN || !PASSWORD) {
      throw new Error('Отсутствуют учетные данные ALEAN_LOGIN или ALEAN_PASSWORD');
    }

    const sessionId = await getSessionId();

    const searchXml = `<?xml version="1.0" encoding="utf-8"?>
<SOAP-ENV:Envelope xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/" xmlns:SOAP-ENC="http://schemas.xmlsoap.org/soap/encoding/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
  <SOAP-ENV:Body>
    <m:GetTourPackageReservationTable xmlns:m="urn:webservice-electrasoft-ru:types-twsReservation2ServiceIntf-ItwsReservation2Service" SOAP-ENV:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
      <SessionID xsi:type="xsd:string">${sessionId}</SessionID>
      <TourCIDArray xsi:type="SOAP-ENC:Array" SOAP-ENC:arrayType="xsd:string[1]">
        <item xsi:type="xsd:string">${params.tourCID}</item>
      </TourCIDArray>
      <BeginDateFrom xsi:type="xsd:date">${params.dateFrom}</BeginDateFrom>
      <BeginDateTill xsi:type="xsd:date">${params.dateTo}</BeginDateTill>
      <BaseSeatQuantity xsi:type="xsd:int">${params.adults}</BaseSeatQuantity>
      <ExtSeatQuantity xsi:type="xsd:int">${params.children}</ExtSeatQuantity>
      <DepartureTownCID xsi:type="xsd:string">${params.departureTownCID}</DepartureTownCID>
    </m:GetTourPackageReservationTable>
  </SOAP-ENV:Body>
</SOAP-ENV:Envelope>`;

    const text = await getSoapResponse(searchXml, 'urn:webservice-electrasoft-ru:types-twsReservation2ServiceIntf-ItwsReservation2Service#GetTourPackageReservationTable');

    if (text.includes('SOAP-ENV:Fault')) {
      const parsed = parser.parse(text);
      const fault = parsed?.['SOAP-ENV:Envelope']?.['SOAP-ENV:Body']?.['SOAP-ENV:Fault']?.faultstring || 'Ошибка поиска';
      throw new Error(fault);
    }

    const results: TourResult[] = [];
    const parsed = parser.parse(text);
    const body = parsed?.['SOAP-ENV:Envelope']?.['SOAP-ENV:Body'];
    const response = body?.['m:GetTourPackageReservationTableResponse']?.return;

    if (response) {
      const innerParsed = typeof response === 'string' ? parser.parse(response) : response;
      const tourPackageTable = innerParsed?.TourPackageTable || innerParsed;

      let offers = tourPackageTable?.OfferList?.item || tourPackageTable?.OfferList?.Offer || [];
      if (!Array.isArray(offers)) offers = offers ? [offers] : [];

      for (const offer of offers) {
        const hotelName = offer?.HotelName || offer?.['@_HotelName'] || 'Отель';
        const roomCategory = offer?.RoomCategoryName || offer?.['@_RoomCategoryName'] || 'Стандарт';
        const priceStr = offer?.TotalPrice || offer?.['@_TotalPrice'] || '0';
        const nights = offer?.NightQuantity || offer?.['@_NightQuantity'] || '0';
        const line = offer?.Line || offer?.['@_Line'] || '';

        if (!line || isNaN(parseFloat(String(priceStr)))) continue;

        results.push({
          id: `alean_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          providerId: 'alean',
          hotelName: String(hotelName),
          roomCategory: String(roomCategory),
          nights: parseInt(String(nights), 10) || 0,
          price: parseFloat(String(priceStr)) || 0,
          currency: 'RUB',
          rawBookingData: { line, sessionId, tourCID: params.tourCID, departureTownCID: params.departureTownCID }
        });
      }
    }

    return results.sort((a, b) => a.price - b.price);
  }
};
