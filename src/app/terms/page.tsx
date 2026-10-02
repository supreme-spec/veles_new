import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Условия использования | Велес Вояж',
  description: 'Условия использования сайта и услуг турагентства Велес Вояж. Правила бронирования, оплаты, отмены туров и ответственности сторон.',
};

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-12 max-w-4xl">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 md:mb-8 text-gray-900 dark:text-gray-100">
        Условия использования
      </h1>

      <div className="space-y-6 md:space-y-8 text-gray-700 dark:text-gray-300">
        <section>
          <h2 className="text-lg sm:text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
            1. Общие положения
          </h2>
          <p className="text-sm sm:text-base leading-relaxed">
            Настоящие Условия использования регулируют отношения между пользователем и турагентством Велес Вояж при оформлении заявок на подбор, бронирование и оплату туристических услуг через сайт veles-voyage.ru. Используя сайт, вы подтверждаете согласие с данными условиями.
          </p>
        </section>

        <section>
          <h2 className="text-lg sm:text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
            2. Оформление заявки и подбор тура
          </h2>
          <p className="text-sm sm:text-base leading-relaxed">
            Пользователь может оставить заявку через форму на сайте, связаться с менеджером по телефону +7 985 063-51-34 или через мессенджеры. Предварительные расчёты стоимости и наличие мест носят информационный характер и не являются публичной офертой. Окончательная стоимость тура подтверждается менеджером при бронировании.
          </p>
        </section>

        <section>
          <h2 className="text-lg sm:text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
            3. Оплата
          </h2>
          <p className="text-sm sm:text-base leading-relaxed">
            Оплата услуг производится безналичным способом или наличными в офисе агентства. Сумма, сроки и способ оплаты согласовываются с менеджером индивидуально. Подтверждением оплаты является квитанция или банковское уведомление.
          </p>
        </section>

        <section>
          <h2 className="text-lg sm:text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
            4. Отмена и возврат
          </h2>
          <p className="text-sm sm:text-base leading-relaxed">
            Условия отмены и возврата зависят от правил туроператора, авиакомпании и отеля. Менеджер предупреждает о штрафных санкциях до подтверждения бронирования. Возврат средств осуществляется в порядке и сроки, установленные правилами перевозчика и отеля, а также действующим законодательством РФ.
          </p>
        </section>

        <section>
          <h2 className="text-lg sm:text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
            5. Ответственность
          </h2>
          <p className="text-sm sm:text-base leading-relaxed">
            Велес Вояж выступает как посредник между клиентом и туроператорами, перевозчиками, отелями. Агентство не несёт ответственность за прямые убытки клиента, вызванные изменением рейсов, качеством проживания или форс-мажорными обстоятельствами. Мы стремимся помочь в урегулировании спорных ситуаций между контрагентами.
          </p>
        </section>

        <section>
          <h2 className="text-lg sm:text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
            6. Документы и визы
          </h2>
          <p className="text-sm sm:text-base leading-relaxed">
            Клиент обязан предоставить точные паспортные данные для оформления документов. Визовые правила могут меняться; актуальную информацию предоставляет менеджер на момент бронирования. Агентство не несёт ответственности за отказ в визе или въезде, связанном с ошибками в документах, предоставленных клиентом.
          </p>
        </section>

        <section>
          <h2 className="text-lg sm:text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
            7. Конфиденциальность и данные
          </h2>
          <p className="text-sm sm:text-base leading-relaxed">
            Мы обрабатываем персональные данные в соответствии с Политикой конфиденциальности и законодательством РФ. Передавая данные, вы соглашаетесь на их обработку для оформления туристических услуг.
          </p>
        </section>

        <section>
          <h2 className="text-lg sm:text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
            8. Контакты
          </h2>
          <p className="text-sm sm:text-base leading-relaxed">
            По всем вопросам обращайтесь:
          </p>
          <ul className="list-disc list-inside mt-2 space-y-1 text-sm sm:text-base">
            <li>
              Телефон:{' '}
              <a href="tel:+79850635134" className="text-indigo-600 dark:text-indigo-400 hover:underline">
                +7 985 063-51-34
              </a>
            </li>
            <li>
              Email:{' '}
              <a href="mailto:hello@veles-voyage.ru" className="text-indigo-600 dark:text-indigo-400 hover:underline">
                hello@veles-voyage.ru
              </a>
            </li>
            <li>Адрес: 143041, Московская область, Голицыно, пр-т Керамиков, д. 103</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
