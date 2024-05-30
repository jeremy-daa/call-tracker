import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function TableDemo({
  calls,
  callsLoading,
}: {
  calls: any[];
  callsLoading: boolean;
}) {
  if (!calls)
    <h3>
      You have not made any calls yet. Please make a call to see the list of
      calls.
    </h3>;
  return (
    <>
      {callsLoading ? (
        <h3 className="w-full text-center text-lg">
          Fetching your calls. Please wait a moment!
        </h3>
      ) : (
        <>
          {calls.length > 0 ? (
            <>
              <Table>
                <TableCaption>A list of your recent calls.</TableCaption>
                <TableHeader className="bg-slate-500">
                  <TableRow>
                    <TableHead className="w-[100px]">Id.</TableHead>
                    <TableHead>Outcome</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead className="text-right">Note</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {calls.map((call, index) => (
                    <TableRow key={call._id}>
                      <TableCell className="font-medium">{index}</TableCell>
                      <TableCell>{call.callOutcome}</TableCell>
                      <TableCell>{call.callDuration} Sec</TableCell>
                      <TableCell className="text-right">
                        {call.callNotes}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </>
          ) : (
            <>
              <h3 className="w-full text-center text-lg">
                You have not made any calls yet. Please make a call to see the
                list of calls.
              </h3>
            </>
          )}
        </>
      )}
    </>
  );
}
