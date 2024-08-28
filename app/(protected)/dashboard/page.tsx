import { Button } from "~/components/ui/button";

export default async function Dashboard() {
  return (
    <>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Dashboard</h1>
      </div>
      <div
        className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
        x-chunk="dashboard-02-chunk-1"
      >
        <div className="flex flex-col items-center gap-1 text-center max-w-md">
          <h3 className="text-2xl font-bold tracking-tight">
            Não foi possível gerar a sua dashboard
          </h3>
          <p className="text-sm text-muted-foreground">
            Para que possamos configurar a sua dashboard, você precisa de pelo
            menos uma transação adicionad.
          </p>
          <Button className="mt-4">Adicionar transação</Button>
        </div>
      </div>
    </>
  );
}
