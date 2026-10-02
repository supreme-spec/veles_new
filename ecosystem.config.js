module.exports = {
  apps: [
    {
      name: 'veles-voyage',
      cwd: '/root/www/veles-voyage',
      script: 'node_modules/next/dist/bin/next',
      args: 'start -p 3000 -H 0.0.0.0',
      interpreter: 'node',
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      max_memory_restart: '1500M',
      kill_timeout: 5000,
      listen_timeout: 10000,
      env: {
        NODE_ENV: 'production',
        PORT: '3000',
        HOSTNAME: '0.0.0.0',
      },
      error_file: '/root/.pm2/logs/veles-voyage-error.log',
      out_file: '/root/.pm2/logs/veles-voyage-out.log',
      merge_logs: true,
      time: true,
    },
  ],
};
