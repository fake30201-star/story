// =========================================================
// إعدادات الاتصال بـ Supabase
// =========================================================
const SUPABASE_URL = "https://hpaohnfxgbulfwsgwclu.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhwYW9obmZ4Z2J1bGZ3c2d3Y2x1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODcwMDIyMzcsImV4cCI6MjEwMjU3ODIzN30.54HHUkI0Ho369-OiVDKpsPLjF24-nJzMsZKlQHXzlSc";

// عميل Supabase مشترك بين كل صفحات الموقع
const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const STORE_NAME = "أتيليه"; // اسم المتجر — غيّريه زي ما تحبي
const PRODUCT_IMAGES_BUCKET = "product-images";
