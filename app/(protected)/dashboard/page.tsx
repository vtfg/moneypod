import { BarChart } from "~/components/dashboard/cards/bar";
import CreateTransactionForm from "~/components/forms/dashboard/create-transaction-form";
import { getUserTransactions } from "~/lib/data/user";

export default async function Dashboard() {
  const transactions = await getUserTransactions();

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Dashboard</h1>

        {transactions && <CreateTransactionForm />}
      </div>

      {transactions ? (
        <div className="flex flex-1 rounded-lg border shadow-sm p-4">
          <div className="grid">
            <BarChart />
          </div>
        </div>
      ) : (
        <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
          <div className="flex flex-col items-center gap-2 text-center max-w-md">
            <h3 className="text-2xl font-bold tracking-tight">
              Não foi possível gerar a sua dashboard
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Para que possamos configurar a sua dashboard, você precisa de pelo
              menos uma transação adicionada.
            </p>

            <CreateTransactionForm />
          </div>
        </div>
      )}
    </>
  );
}
