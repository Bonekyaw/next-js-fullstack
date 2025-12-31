"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createPostAction } from "@/lib/actions/post";

export default function CreatePostForm() {
  return (
    <div className="w-full max-w-md">
      <form action={createPostAction}>
        <FieldGroup>
          <FieldSet>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="checkout-7j9-card-name-43j">
                  Post Title
                </FieldLabel>
                <Input
                  id="checkout-7j9-card-name-43j"
                  name="title"
                  placeholder="Evil Rabbit"
                  required
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="checkout-7j9-optional-comments">
                  Post Content
                </FieldLabel>
                <Textarea
                  id="checkout-7j9-optional-comments"
                  name="content"
                  placeholder="Add any content"
                  className="resize-none"
                />
              </Field>
              <Field orientation="horizontal">
                <Checkbox
                  id="checkout-7j9-same-as-shipping-wgm"
                  name="published"
                  defaultChecked
                />
                <FieldLabel
                  htmlFor="checkout-7j9-same-as-shipping-wgm"
                  className="font-normal"
                >
                  This post will be published right now.
                </FieldLabel>
              </Field>
            </FieldGroup>
          </FieldSet>
          <Field orientation="horizontal">
            <Button type="submit">Submit</Button>
            <Button variant="outline" type="reset">
              Reset
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </div>
  );
}
