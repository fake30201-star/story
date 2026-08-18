/* =========================================================
   admin-auth.js
   يستخدم في صفحة login.html فقط
   ========================================================= */
(function(){
  "use strict";

  const form = document.getElementById("login-form");
  const errorBox = document.getElementById("login-error");
  const loginBtn = document.getElementById("login-btn");

  function showError(msg){
    errorBox.textContent = msg;
    errorBox.style.display = "block";
  }

  // لو فيه جلسة شغالة وأدمن بالفعل، حوّليها على الداشبورد على طول
  (async function checkExistingSession(){
    const { data: { session } } = await supabaseClient.auth.getSession();
    if(session){
      const isAdmin = await verifyAdmin(session.user.id);
      if(isAdmin) window.location.href = "dashboard.html";
    }
  })();

  async function verifyAdmin(userId){
    const { data, error } = await supabaseClient
      .from("admins")
      .select("user_id")
      .eq("user_id", userId)
      .maybeSingle();
    if(error){ console.error(error); return false; }
    return !!data;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    errorBox.style.display = "none";
    loginBtn.disabled = true;
    loginBtn.textContent = "جاري الدخول...";

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    try{
      const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password });
      if(error) throw error;

      const isAdmin = await verifyAdmin(data.user.id);
      if(!isAdmin){
        await supabaseClient.auth.signOut();
        showError("هذا الحساب غير مصرح له بالدخول إلى لوحة التحكم.");
        return;
      }

      window.location.href = "dashboard.html";
    }catch(err){
      console.error(err);
      showError("بيانات الدخول غير صحيحة. حاولي مرة أخرى.");
    }finally{
      loginBtn.disabled = false;
      loginBtn.textContent = "تسجيل الدخول";
    }
  });

})();
