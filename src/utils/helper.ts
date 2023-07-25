import { config } from "@/enums/Api";

const getCategories = async () => {
  const request = await fetch(`${config._BaseURL}get_all_cats`, {
    headers: {
      "private-key": config._PrivateKey,
    },
  });
  const response = await request.json();
  return response;
};

const getProcessType = async (subCatId:number) => {
  const request = await fetch(
    `${config._BaseURL}properties?cat=` + subCatId,
    {
      headers: {
        "private-key": "3%o8i}_;3D4bF]G5@22r2)Et1&mLJ4?$@+16",
      },
    }
  );

  const response = await request.json();

  const processTypes = response.data.filter(
    (type) => type.slug === "process-type"
  )[0]?.options || [];
  const brands = response.data.filter((type) => type.slug === "brand")[0]
    ?.options || [];
  const transmissionType = response.data.filter(
    (type) => type.slug === "transmission-type"
  )[0]?.options ||[];

  return { processTypes, brands, transmissionType };
};

export { getCategories,getProcessType};
