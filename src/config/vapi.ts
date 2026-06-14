// Vapi public key + assistant ID are safe to ship client-side (not secret keys).
// Env vars override these when set locally or in your host's build settings.
const DEFAULT_VAPI_PUBLIC_KEY = '9cd88cd3-d6aa-40b4-ac16-3f12f808b838';
const DEFAULT_VAPI_ASSISTANT_ID = '858d731c-d540-4a09-81b5-67977cd8f54e';

export const vapiPublicKey =
  import.meta.env.VITE_VAPI_PUBLIC_KEY?.trim() || DEFAULT_VAPI_PUBLIC_KEY;

export const vapiAssistantId =
  import.meta.env.VITE_VAPI_ASSISTANT_ID?.trim() || DEFAULT_VAPI_ASSISTANT_ID;

export const isVapiConfigured = Boolean(vapiPublicKey && vapiAssistantId);
