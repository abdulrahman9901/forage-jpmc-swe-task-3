import { ServerRespond } from './DataStreamer';

export interface Row {
  price_abc: number,
  price_def: number,
  upper_bound: number,
  lower_bound: number,
  ratio: number,
  timestamp: Date,
  tigger_alert: number | undefined,
}


export class DataManipulator {
  static generateRow(serverResponds: ServerRespond[]) :Row {
      const price_abc = (serverResponds[0].top_ask.price + serverResponds[0].top_bid.price) /2; 
      const price_def = (serverResponds[1].top_ask.price + serverResponds[1].top_bid.price) /2;
      const ratio = price_abc / price_def ; 
      const upper_bound = 1 + .05;
      const lower_bound = 1 - .05;
      const timestamp = serverResponds[0].timestamp > serverResponds[1].timestamp ? serverResponds[0].timestamp :serverResponds[1].timestamp; 
      const tigger_alert = (ratio < lower_bound || ratio > upper_bound ) ? ratio : undefined ;
      return {
        timestamp,
        price_abc,
        price_def ,
        upper_bound,
        lower_bound,
        ratio,
        tigger_alert,
      };
  }
}
