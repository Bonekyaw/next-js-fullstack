"use client";

import { useActionState } from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createPostAction, State } from "@/lib/actions/post";

export default function CreatePostForm() {
  // Testing Purpose
  const authorId = 1;
  const createPostActionWithId = createPostAction.bind(null, authorId);

  const initialState: State = { errors: {}, message: null };
  const [state, formAction, pending] = useActionState(
    createPostActionWithId,
    initialState
  );

  return (
    <div className="w-full max-w-md">
      <form action={formAction}>
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
              <div>
                {state.errors?.title &&
                  state.errors?.title.map((error: string) => (
                    <p key={error} className="text-sm text-red-500">
                      {error}
                    </p>
                  ))}
              </div>

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
              <div>
                {state.errors?.content &&
                  state.errors?.content.map((error: string) => (
                    <p key={error} className="text-sm text-red-500">
                      {error}
                    </p>
                  ))}
              </div>

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
              <div>
                {state.errors?.published &&
                  state.errors?.published.map((error: string) => (
                    <p key={error} className="text-sm text-red-500">
                      {error}
                    </p>
                  ))}
              </div>
            </FieldGroup>
          </FieldSet>
          <Field orientation="horizontal">
            <Button type="submit" disabled={pending}>
              {pending ? "Submitting..." : "Submit"}
            </Button>
            <Button variant="outline" type="reset">
              Reset
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </div>
  );
}
