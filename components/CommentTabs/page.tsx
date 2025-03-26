"use client"

import { Tabs, Tab } from "@heroui/tabs"
import { Card, CardBody } from "@heroui/card"
import AddCommentPage from "@/app/addComment/page";
import CommentSectionPage from "@/app/commentSection/page";


export default function CommentTabs() {
  return (
    <div className="flex w-100 flex-col">
      <Tabs aria-label="Options" color="secondary">
        <Tab key="AddComments" title="Add Comment">
          <Card>
            <CardBody>
              <AddCommentPage />

            </CardBody>
          </Card>
        </Tab>
        <Tab key="CommentSection" title="Comment Section">
          <Card>
            <CardBody>
              <CommentSectionPage />
            </CardBody>
          </Card>
        </Tab>

      </Tabs>
    </div>
  );
}
