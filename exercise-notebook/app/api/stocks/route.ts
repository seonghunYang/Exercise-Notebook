import { NextRequest } from "next/server";
import { stock_list } from "./data";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("query");

  if (query === null) {
    return Response.json({
      data: [],
    });
  }

  // query로 네임 필터링
  const searched_stock_list = stock_list.filter((stock) =>
    stock.name.includes(query)
  );

  // 전송
  return Response.json({
    data: searched_stock_list,
  });
}
