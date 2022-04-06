import Card from "@/components/card";
import { useRouter } from "next/router";
import { QueryClient, QueryClientProvider } from "react-query";

export default function Page() {
  const { query } = useRouter();

  return (
    <QueryClientProvider client={new QueryClient()}>
      <div
        className="flex justify-center mb-16 items-center h-full bg-base-300"
        data-theme={query.theme || "light"}
      >
        <Card {...query} />
      </div>
    </QueryClientProvider>
  );
}
