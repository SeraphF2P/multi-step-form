export async function GET(request: Request) {
  return new Response(
    JSON.stringify([
      {
        id: "1",
        name: "Arcade",
        src: "/icon-arcade.svg",
        pricing: { yearly: 90, monthly: 9 },
      },
      {
        id: "2",
        name: "Advanced",
        src: "/icon-advanced.svg",
        pricing: { yearly: 120, monthly: 12 },
      },
      {
        id: "3",
        name: "Pro",
        src: "/icon-pro.svg",
        pricing: { yearly: 150, monthly: 15 },
      },
    ])
  );
}
