'use client'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"

type DialogProps= {
    open: boolean,
    setClose: () => void;
    title: string;
    content: React.ReactNode;
    footer?: React.ReactNode;
}

export const DialogBox = ({open, setClose, title, content, footer}:DialogProps) => {

    return(
        <Dialog open={open} onOpenChange={setClose}>
        <DialogContent aria-describedby="content">
          <DialogHeader>
            <DialogTitle>{title ?? "Dialog Title"}</DialogTitle>
            <div>
                <DialogDescription className="my-4"></DialogDescription>
                { content } 
            </div>
          </DialogHeader>
          <DialogFooter>
            { footer }
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
}