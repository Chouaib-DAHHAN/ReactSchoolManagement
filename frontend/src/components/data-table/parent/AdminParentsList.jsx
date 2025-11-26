import { useEffect, useState } from "react";
import { DataTable } from "../DataTable";
import ParentApi from "../../../services/api/ParentApi";
import { Button } from "@/components/ui/button";
import { ArrowUp, ArrowDown } from "lucide-react";
import { DataTableColumnHeader } from "../DataTableColumnHeader";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import ParentCreateEditForm from "../../Forms/ParentCreateEditForm";

export default function AdminParentsList() {
    const parents = [
        {
            accessorKey: "id",
            header: "id",
        },
        {
            accessorKey: "firstname",
            header: ({ column }) => {
                return (
                    <DataTableColumnHeader column={column} title="FirstName" />
                );
            },
        },
        {
            accessorKey: "lastname",
            header: ({ column }) => {
                return (
                    <DataTableColumnHeader column={column} title="LastName" />
                );
            },
        },
        {
            accessorKey: "date_of_birth",
            header: "Date of Birth",
        },
        {
            accessorKey: "gender",
            header: "Gender",
        },
        {
            accessorKey: "blood_type",
            header: "Blood Type",
        },
        {
            accessorKey: "address",
            header: "Adress",
        },
        {
            accessorKey: "phone",
            header: ({ column }) => {
                return <DataTableColumnHeader column={column} title="Phone" />;
            },
        },
        {
            accessorKey: "email",
            header: ({ column }) => {
                const isAsc = column.getIsSorted() === "asc";
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(isAsc)}
                    >
                        email
                        {isAsc ? (
                            <ArrowUp className="ml-2 h-4 w-4" />
                        ) : (
                            <ArrowDown className="ml-2 h-4 w-4" />
                        )}
                    </Button>
                );
            },
        },
        // {
        //     accessorKey: "updated_at",
        //     header: "Updated At",
        // },

        {
            accessorKey: "Actions",
            id: "actions",
            cell: ({ row }) => {
                const { id, firstname, lastname } = row.original;

                return (
                    <>
                        <Sheet>
                            <SheetTrigger>
                                <Button>Edit</Button>
                                </SheetTrigger>
                            <SheetContent>
                                <SheetHeader>
                                    <SheetTitle>
                                        Are you absolutely sure?
                                    </SheetTitle>
                                    <SheetDescription>
                                        This action cannot be undone. This will
                                        Update your account !
                                    </SheetDescription>
                                     <ParentCreateEditForm values={row.original} handleSubmit={(values) => ParentApi.update(id ,values)}/>
                                </SheetHeader>
                            </SheetContent>
                        </Sheet>
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button size={"sm"} variant={"destructive"}>
                                    Delete
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>
                                        Are you absolutely sure to delete{" "}
                                        <span className={"font-bold"}>
                                            {firstname} {lastname}
                                        </span>
                                        ?
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action cannot be undone. This will
                                        permanently delete your account and
                                        remove your data from our servers.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>
                                        Cancel
                                    </AlertDialogCancel>
                                    <AlertDialogAction
                                        onClick={async () => {
                                            const { status } =
                                                await ParentApi.delete(id);

                                            if (status === 200) {
                                                setData(
                                                    data.filter(
                                                        (parent) =>
                                                            parent.id !== id
                                                    )
                                                );
                                                toast.success(
                                                    "Parent deleted",
                                                    {
                                                        description: `Parent deleted successfully ${firstname} ${lastname}`,
                                                    }
                                                );
                                            }
                                        }}
                                    >
                                        Delete
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </>
                );
            },
        },
    ];

    const [data, setData] = useState([]);

    useEffect(() => {
        ParentApi.all().then(({ data }) => setData(data.data));
    }, []);

    return (
        <>
            <DataTable columns={parents} data={data}></DataTable>
        </>
    );
}
