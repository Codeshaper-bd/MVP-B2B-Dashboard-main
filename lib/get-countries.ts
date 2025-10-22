"use server";
import { promises as fs } from "fs";

export interface ICountry {
  name?: string;
  code?: string;
  emoji?: string;
  unicode?: string;
  image?: string;
}

export type TCountries = Partial<ICountry>[];

export const getCountriesData = async () => {
  try {
    const file = await fs.readFile(
      `${process.cwd()}/public/json/countries.json`,
      "utf8",
    );
    //   const response = await fetch(process.cwd() + "/public/zoo-flight-search.json");
    const data = ((await JSON.parse(file)) ?? []) as TCountries;
    return data;
  } catch (e) {
    console.error("error getting country data: ", e);
  }
};
