export const contact = {
  email: "hola@tudominio.com",
  whatsapp: "5491100000000", // 549 + código de área + número, sin 0 ni 15
  whatsappText:
    "Hola Federico, vi tu portfolio y me gustaría hablar de un proyecto.",
};

export const whatsappUrl = `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(contact.whatsappText)}`;
