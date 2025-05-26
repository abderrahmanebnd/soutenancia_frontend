import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  FileText,
  FileImage,
  FileArchive,
  FileSpreadsheet,
  FileCode,
  File,
  MoreHorizontal,
  Trash,
  ExternalLink,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { format, parseISO } from "date-fns";
import { useDeleteDeliverablBySprint } from "./useDeleteDeliverableBySprint";
import ButtonWithSpinner from "@/components/commun/ButtonWithSpinner";
function SprintDeliverablesCards({
  title,
  description,
  file,
  uploadDate,
  deliverableId,
  sprintId,
  firstName,
  lastName,
}) {
  const [isHovered, setIsHovered] = useState(false);
  const { deleteDeliverable, isDeletingDeliverable } =
    useDeleteDeliverablBySprint(sprintId);
  const getFileIcon = () => {
    switch (file.slice(-3)) {
      case "txt":
        return <FileText className="h-10 w-10 text-primary" />;
      case "pdf":
        return <FileText className="h-10 w-10 text-red-500" />;
      case "jpg":
      case "png":
      case "gif":
        return <FileImage className="h-10 w-10 text-purple-500" />;
      case "zip":
      case "rar":
        return <FileArchive className="h-10 w-10 text-yellow-500" />;
      case "xlsx":
      case "csv":
        return <FileSpreadsheet className="h-10 w-10 text-green-500" />;
      case "js":
      case "html":
      case "css":
        return <FileCode className="h-10 w-10 text-blue-500" />;
      case "docx":
      case "doc":
        return <FileText className="h-10 w-10 text-blue-600" />;
      case "pptx":
      case "ppt":
        return <FileText className="h-10 w-10 text-orange-500" />;
      default:
        return <File className="h-10 w-10 text-slate-500" />;
    }
  };
  return (
    <Card
      className={`overflow-hidden transition-all duration-200 ${
        isHovered ? "shadow-md" : "shadow-sm"
      } border-slate-200 hover:border-slate-300`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardHeader className="p-4 pb-2 flex flex-row items-start justify-between">
        <div className="flex items-start gap-3">
          {getFileIcon()}
          <div>
            <CardTitle className="text-base font-medium text-slate-800">
              {title}
            </CardTitle>
            <CardDescription className="text-sm line-clamp-2 mt-1">
              {description}
            </CardDescription>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              className="text-destructive"
              onClick={() => deleteDeliverable({ sprintId, deliverableId })}
            >
              <Trash className="mr-2 h-4 w-4" />
              <span>Delete file</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <div className="flex items-center mt-2 text-sm text-slate-500">
          <span className="truncate">
            {title.replace(/ /g, "-")}.{file.slice(-3)}
          </span>
          <Badge variant="outline" className="ml-2 text-xs">
            {file.slice(-3)}
          </Badge>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <div className="flex items-center">
          <Avatar className="h-14 w-14 mr-2 uppercase">
            <AvatarFallback>
              {firstName.at(0)}
              {lastName.at(0)}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-slate-800">
              {firstName} {lastName}
            </span>

            <div className="text-xs text-slate-500">
              <span>{format(parseISO(uploadDate), "PPP")}</span>
            </div>
          </div>
        </div>
        <Button
          disabled={isDeletingDeliverable}
          variant="outline"
          className="text-xs "
          onClick={(e) => {
            e.stopPropagation();
            window.open(file, "_blank");
          }}
        >
          {!isDeletingDeliverable ? (
            <div className="flex items-center gap-1">
              <ExternalLink className="h-3.5 w-3.5 mr-1" />
              <span>Preview</span>
            </div>
          ) : (
            <ButtonWithSpinner variant="outline" className="text-xs w-fit" />
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}

export default SprintDeliverablesCards;
