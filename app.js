const SUPABASE_URL = "https://njyhvsetqpxumrqrywsf.supabase.co"; // замени на своё
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5qeWh2c2V0cXB4dW1ycXJ5d3NmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE3NDYxNDcsImV4cCI6MjA2NzMyMjE0N30.bh0RU8ACt7yYeZkv6QLi9OxxLYlYjOqbkDt7-koDYB0"; // замени на своё

const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const signInBtn = document.getElementById("sign-in");
const signUpBtn = document.getElementById("sign-up");
const signOutBtn = document.getElementById("sign-out");
const authSection = document.getElementById("auth-section");
const appContent = document.getElementById("app-content");

signInBtn.addEventListener("click", async () => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: emailInput.value,
    password: passwordInput.value,
  });

  if (error) {
    alert("Ошибка входа: " + error.message);
  } else {
    console.log("Успешный вход", data);
    checkAuth();
  }
});

signUpBtn.addEventListener("click", async () => {
  const { data, error } = await supabase.auth.signUp({
    email: emailInput.value,
    password: passwordInput.value,
  });

  if (error) {
    alert("Ошибка регистрации: " + error.message);
  } else {
    console.log("Регистрация прошла успешно", data);
    alert("Письмо с подтверждением отправлено");
  }
});

async function checkAuth() {
  const { data: { session } } = await supabase.auth.getSession();
  if (session) {
    authSection.style.display = "none";
    appContent.style.display = "block";
  } else {
    authSection.style.display = "block";
    appContent.style.display = "none";
  }
}

checkAuth();
