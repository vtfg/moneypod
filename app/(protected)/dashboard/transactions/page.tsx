import TransactionsDataTable from "~/components/dashboard/tables/transactions";
import { getUserTransactions } from "~/lib/data/user";

export default async function Transactions() {
  const transactions = await getUserTransactions();

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Transações</h1>
      </div>

      <div className="flex flex-1 rounded-lg border shadow-sm p-4">
        <TransactionsDataTable data={transactions} />
      </div>
    </>
  );
}
