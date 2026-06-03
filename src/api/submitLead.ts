export type LeadFormPayload = {
  name: string;
  shopName: string;
  phone: string;
  email: string;
  crm: string;
  weeklyCalls: string;
};

const SUBMIT_DELAY_MS = 1500;

export async function submitLead(payload: LeadFormPayload): Promise<void> {
  console.log('[FluxGrid] Lead submission payload:', payload);

  await Promise.all([
    new Promise((resolve) => setTimeout(resolve, SUBMIT_DELAY_MS)),
    (async () => {
      try {
        const response = await fetch('/api/leads', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error(`Lead submission failed with status ${response.status}`);
        }

        console.log('[FluxGrid] Lead saved via /api/leads');
      } catch (error) {
        console.warn('[FluxGrid] /api/leads unavailable — mock submission successful:', payload, error);
      }
    })(),
  ]);
}
