export default () => ({
  port: parseInt(process.env.PORT as string, 10) || 3000,
  database: {
    url: process.env.DATABASE_URL as string,
  },
});
