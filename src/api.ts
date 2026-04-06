// Ganti dengan URL Web App Google Script Anda yang sudah di-deploy sebagai 'Anyone'
const WURL = "https://script.google.com/macros/s/AKfycbxxxx/exec"; 

export const callApi = async (action: string, data: any = {}) => {
  try {
    const response = await fetch(WURL, {
      method: "POST",
      body: JSON.stringify({ action, data }),
    });
    return await response.json();
  } catch (error) {
    console.error("API Error:", error);
    return { success: false, error: "Gagal menyambung ke server." };
  }
};
