"use client";
import { InfoIcon as InfoIcon } from "@/components/icons";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
const alcoholTypes = [
  {
    type: "Vodka, Rum, Gin",
    density: 0.95,
    gramsPerOunce: 26.93,
    notes: "Standard spirits – use 27g/oz for quick math",
  },
  {
    type: "Whiskey, Bourbon",
    density: 0.94,
    gramsPerOunce: 27.22,
    notes: "Very similar to vodka – use same method",
  },
  {
    type: "Tequila",
    density: 0.96,
    gramsPerOunce: 26.65,
    notes: "Slightly denser, but close enough to use 27g/oz",
  },
  {
    type: "Liqueurs (Baileys, Amaretto)",
    density: 1.1,
    gramsPerOunce: 31.18,
    notes: "Much heavier – use accurate grams per oz",
  },
  {
    type: "Wine",
    density: 0.99,
    gramsPerOunce: 28.06,
    notes: "Close to water – use 28g/oz",
  },
  {
    type: "Beer (Bottle)",
    density: 1.01,
    gramsPerOunce: 28.63,
    notes: "Slightly heavier than water",
  },
];
const beverageTypes = [
  {
    type: "Wine (Red/White)",
    density: 0.99,
    gramsPerOunce: 28.06,
    quickConversionTip: "Use 28g per oz for simplicity",
    notes: "Slightly lighter than water, minimal difference",
  },
  {
    type: "Whiskey, Bourbon",
    density: 1.01,
    gramsPerOunce: 28.63,
    quickConversionTip:
      "Use 28.35g per oz (same as water) or up to 28.6g for accuracy",
    notes: "Foil and cork cages may affect total bottle weight",
  },
];

function InventoryCategoryGuideModal() {
  return (
    <Dialog>
      <DialogTrigger>
        <InfoIcon className="size-4 text-default-1000" />
      </DialogTrigger>
      <DialogContent className="p-6 lg:max-w-[1184px]">
        <DialogHeader>
          <DialogTitle>Inventory Category Guide</DialogTitle>
        </DialogHeader>
        <Card className="mt-2">
          <CardContent className="p-0">
            <h3 className="p-3">Alcohol Inventory Cheat</h3>
            <Table>
              <TableHeader className="bg-[#161B26]">
                <TableRow>
                  <TableHead className="whitespace-nowrap py-1.5">
                    Alcohol Type
                  </TableHead>
                  <TableHead className="py-1.5">Est. Density (g/mL)</TableHead>
                  <TableHead className="py-1.5">
                    Grams per Ounce (1 oz)
                  </TableHead>
                  <TableHead className="py-1.5">Notes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {alcoholTypes?.map((item) => (
                  <TableRow key={item?.type} className="last:border-b-0">
                    <TableCell className="whitespace-nowrap py-3">
                      {item?.type}
                    </TableCell>
                    <TableCell className="py-3">{item?.density}</TableCell>
                    <TableCell className="py-3">
                      {item?.gramsPerOunce}
                    </TableCell>
                    <TableCell className="min-w-[220px] py-3">
                      {item?.notes}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card className="mt-4">
          <CardContent className="p-0">
            <h3 className="p-3">Wine Champagne Inventory Cheat Sheet</h3>
            <Table>
              <TableHeader className="bg-[#161B26]">
                <TableRow>
                  <TableHead className="whitespace-nowrap py-1.5">
                    Beverage Type
                  </TableHead>
                  <TableHead className="py-1.5">EST. Density (g/mL)</TableHead>
                  <TableHead className="py-1.5">
                    Grams per Ounce (1 oz)
                  </TableHead>
                  <TableHead className="py-1.5">Quick Conversion Tip</TableHead>
                  <TableHead className="py-1.5">Notes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {beverageTypes?.map((item) => (
                  <TableRow key={item?.type} className="last:border-b-0">
                    <TableCell className="whitespace-nowrap py-3">
                      {item?.type}
                    </TableCell>
                    <TableCell className="py-3">{item?.density}</TableCell>
                    <TableCell className="py-3">
                      {item?.gramsPerOunce}
                    </TableCell>
                    <TableCell className="py-3">
                      {item?.quickConversionTip}
                    </TableCell>
                    <TableCell className="min-w-[220px] py-3">
                      {item?.notes}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}

export default InventoryCategoryGuideModal;
