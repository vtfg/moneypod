import { PiggyBank } from "lucide-react";

export default function Logo() {
  return (
    <div className="flex items-center text-lg font-medium gap-2">
      <div className="flex items-center justify-center p-1 rounded-sm bg-primary text-white">
        <PiggyBank className="w-6 h-6" />
      </div>
      Moneypod
    </div>
  );
}
