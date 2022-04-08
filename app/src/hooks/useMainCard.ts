import { BigNumber, BigNumberish } from "ethers";
import { useQuery, useQueryClient } from "react-query";
import { useFetchMeta } from "./fetcher";

export const useMainCard = () => {
  const { data: id } = useQuery(["main-card"], {
    enabled: false,
  });
  const { data: meta } = useFetchMeta(
    "astar",
    id ? BigNumber.from(id) : undefined
  );
  const queryClient = useQueryClient();

  const setMainCard = (id: BigNumberish) =>
    queryClient.setQueryData(["main-card"], BigNumber.from(id).toString());

  return { meta, setMainCard };
};
