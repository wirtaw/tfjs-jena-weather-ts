export default {
  MAIN:
  {
    PORT: process?.env?.PORT && !Number.isNaN(parseInt(process.env?.PORT, 10)) ? parseInt(process.env.PORT, 10) : 8080,
  }
};