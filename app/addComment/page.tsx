"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Textarea } from "@heroui/input";
import { Form } from "@heroui/form";
import { addToast } from "@heroui/toast";
import { Tooltip } from "@heroui/tooltip";

interface ApiResponse {
  success: boolean;

  error?: string;
}

const AddCommentPage: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [comment, setComment] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [action, setAction] = useState<string | null>(null);

  const handleChangeName = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  const handleChangeComment = (event: ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await fetch("/api/sendComment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, comment }),
      });

      const data: ApiResponse = await response.json();

      if (data.success) {
        addToast({
          color: "secondary",
          title: `${name} added the comment: "${comment}"`,
          promise: new Promise((resolve) => setTimeout(resolve, 3000)),
        });
        setMessage("Comment stored successfully!");
        setName(""); // Clear the name input
        setComment(""); // Clear the comment input
        setAction("submit");
      } else {
        addToast({
          color: "danger",
          title: "Comment stored Failed to store comment: !",
          promise: new Promise((resolve) => setTimeout(resolve, 3000)),
        });
        setMessage("Failed to store comment: " + data.error);
        setAction("error");
      }
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        /* eslint-disable-next-line no-console */
        console.error("Error submitting comment:", error);
      }
      setMessage("An error occurred while submitting the comment.");
      setAction("error");
    }
  };

  return (
    <div>
      <Form
        className="w-full max-w-xs flex flex-col gap-4"
        onSubmit={handleSubmit}
      >
        <Input
          isRequired
          errorMessage="Please enter a valid name"
          label="name"
          labelPlacement="outside"
          name="username"
          placeholder="Enter your name"
          type="text"
          value={name}
          onChange={handleChangeName}
        />
        <Textarea
          isRequired
          className="max-w-xs"
          cols={50}
          errorMessage="Please enter a valid comment"
          label="Comment"
          minRows={4}
          placeholder="Enter your comment"
          type="text"
          value={comment}
          onChange={handleChangeComment}
        />

        <div className="flex gap-2">
          <Tooltip color="primary" content="add comment">
            <Button color="primary" type="submit">
              {" "}
              Comment{" "}
            </Button>
          </Tooltip>
        </div>
      </Form>
    </div>
  );
};

export default AddCommentPage;
