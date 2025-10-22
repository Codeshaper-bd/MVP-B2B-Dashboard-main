"use client";

import Link from "next/link";
import { memo, useState } from "react";

import FileImporter from "@/components/form/file-importer";
import type { TFileImporterData } from "@/components/form/file-importer/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function ProductImport() {
  const [data, setData] = useState<TFileImporterData | null>(null);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <CardTitle className="flex-1">Update Inventory</CardTitle>
          <p className="text-sm text-default-700">
            Inventory Last Update: 11-12-2024
          </p>
          <Button type="button" color="primary" asChild>
            <Link href="./update-inventory/compared-inventory"> Open File</Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <FileImporter data={data} setData={setData} />
      </CardContent>
    </Card>
  );
}

export default memo(ProductImport);
