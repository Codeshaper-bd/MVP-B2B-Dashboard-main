"use client";
import { Fragment } from "react";

import { Card, CardContent, CardTitle } from "@/components/ui/card";

import SentimentAnalysis from "./sentiment-analysis";
import SummaryStatistics from "./summery-statistics";

function FeedBackOverview() {
  return (
    <Fragment>
      <Card className="p-6 shadow-none">
        <CardTitle className="font-semibold leading-7 text-default-900">
          Feedback Overview
        </CardTitle>
        <CardContent className="space-y-6 p-0">
          <h1 className="text-sm font-normal leading-5 text-default-600">
            Total number of feedback received from all customers.
          </h1>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <SummaryStatistics />
            <SentimentAnalysis />
          </div>
        </CardContent>
      </Card>
    </Fragment>
  );
}

export default FeedBackOverview;
