import { config } from "dotenv";

// تحميل ملف .env المناسب حسب البيئة
config({ path: `.env.${process.env.NODE_ENV || "development"}` });

// تعريف الواجهة للأنواع
interface EnvConfig {
  DB_URI: string;
  PORT?: string;
  NODE_ENV?: string;
  SECRET_KEY?: string;
}

// التحقق من وجود المتغيرات المطلوبة
const env: EnvConfig = {
  DB_URI: process.env.DB_URI as string,
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
};

if (!env.DB_URI) {
  throw new Error("Missing DB_URI in environment variables");
}

// تصدير المتغيرات
export const { DB_URI, PORT, NODE_ENV, SECRET_KEY } = env;
export default env;
