"use client";

import { useState } from "react";

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
          <div className="flex items-center gap-3">
            <Button type="button" color="secondary">
              Cancel
            </Button>
            <Button type="button" color="primary">
              Update
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <FileImporter data={data} setData={setData} />
      </CardContent>
    </Card>
  );
}

export default ProductImport;
