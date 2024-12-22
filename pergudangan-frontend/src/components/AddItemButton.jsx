import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import AddItemForm from "@/components/AddItemForm";
import EditItemForm from "@/components/EditItemForm";
import { SkeletonBatikForm } from "@/components/skeleton/MySkeleton";
import { Suspense } from "react";

const AddItemButton = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="mb-4" >Add New Batik</Button>
            </DialogTrigger>
            <Suspense fallback={<SkeletonBatikForm />}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Adding New Batik</DialogTitle>
                        <DialogDescription>
                            Fill all the form required to add new item
                        </DialogDescription>
                    </DialogHeader>
                    <div>
                        <AddItemForm />
                    </div>
                </DialogContent>
            </Suspense>
        </Dialog>
        
    )
}

const EditItemButton = ({ item, onClose }) => {
    return (
        <Dialog open={!!item} onOpenChange={onClose}>
            <Suspense fallback={<SkeletonBatikForm />}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Editing Batik</DialogTitle>
                    <DialogDescription>
                        Fill all the form required to edit item
                    </DialogDescription>
                </DialogHeader>
                <div>
                {item ? (
                        <EditItemForm item={item} onClose={onClose} />
                    ) : null}
                </div>
            </DialogContent>
            </Suspense>
        </Dialog>
    )
}

export {AddItemButton, EditItemButton};