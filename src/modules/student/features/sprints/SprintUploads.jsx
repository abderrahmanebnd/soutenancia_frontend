import { SprintFilesUpload } from "@/components/commun/SprintFilesUpload";
import SectionTitle from "../../components/SectionTitle";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useCreateDeliverablePerSprint } from "./useCreateDeliverablePerSprint";
import ButtonWithSpinner from "@/components/commun/ButtonWithSpinner";

function SprintUploads({ idSprint }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState([]);
  const { deliverable, isCreatingDeliverable, isSuccessCreatingDeliverable } =
    useCreateDeliverablePerSprint(idSprint);
  useEffect(() => {
    if (isSuccessCreatingDeliverable) {
      setTitle("");
      setDescription("");
      setFiles([]);
    }
  }, [isSuccessCreatingDeliverable]);

  function handleSubmit(e) {
    e.preventDefault();
    if (files.length === 0) {
      toast.error("Please upload a file.");
      return;
    }
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("file", files[0]);

    deliverable({ sprintId: idSprint, data: formData });
  }
  return (
    <div>
      <div className="bg-white rounded-xl p-4 shadow-md space-y-4 ">
        <SectionTitle
          title="Sprint Uploads"
          subtitle="Upload files related to this sprint"
        />
        <div className="rounded-xl space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              value={title}
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              id="title"
              placeholder="add a title"
            />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              value={description}
              placeholder="Type your description here."
              id="description"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <SprintFilesUpload files={files} setFiles={setFiles} />
        </div>
        {isCreatingDeliverable ? (
          <div className="flex justify-center items-center">
            <ButtonWithSpinner
              disabled={isCreatingDeliverable}
              className="w-1/2 mt-4"
            />
          </div>
        ) : (
          <div className="flex justify-center items-center">
            <Button
              type="submit"
              onClick={handleSubmit}
              className="w-1/2 mt-4"
              size="lg"
            >
              submit deliverable
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default SprintUploads;
