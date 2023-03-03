export async function GET(request: Request) {
  return new Response(
    JSON.stringify({
      yearly: [
        {
          name: "Online service",
          description: "access to multiplayer games",
          price: 10,
        },
        {
          name: "large storage",
          description: "extra 1TB of cloud save",
          price: 20,
        },
        {
          name: "customizable profile",
          description: "custom theme on your profile",
          price: 20,
        },
      ],
      monthly: [
        {
          name: "Online service",
          description: "access to multiplayer games",
          price: 1,
        },
        {
          name: "large storage",
          description: "extra 1TB of cloud save",
          price: 2,
        },
        {
          name: "customizable profile",
          description: "custom theme on your profile",
          price: 2,
        },
      ],
    })
  );
}
