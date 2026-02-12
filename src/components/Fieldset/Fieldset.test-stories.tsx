'use client';

import * as React from 'react';
import { Fieldset } from './parts';
import { Field } from '@/components/Field';
import { Input } from '@/components/Input';

export function BasicFieldset() {
  return (
    <Fieldset.Root>
      <Fieldset.Legend>Personal Information</Fieldset.Legend>
      <Field.Root name="firstName">
        <Field.Label>First Name</Field.Label>
        <Input placeholder="Enter first name" />
      </Field.Root>
      <Field.Root name="lastName">
        <Field.Label>Last Name</Field.Label>
        <Input placeholder="Enter last name" />
      </Field.Root>
    </Fieldset.Root>
  );
}

export function FieldsetWithDescription() {
  return (
    <Fieldset.Root>
      <Fieldset.Legend>Contact Details</Fieldset.Legend>
      <Field.Root name="email">
        <Field.Label>Email</Field.Label>
        <Input type="email" placeholder="Enter email" />
        <Field.Description>We'll use this to contact you.</Field.Description>
      </Field.Root>
      <Field.Root name="phone">
        <Field.Label>Phone</Field.Label>
        <Input type="tel" placeholder="Enter phone number" />
        <Field.Description>Optional phone number.</Field.Description>
      </Field.Root>
    </Fieldset.Root>
  );
}

export function HorizontalFieldset() {
  return (
    <Fieldset.Root orientation="horizontal">
      <Fieldset.Legend>Address</Fieldset.Legend>
      <Field.Root name="city">
        <Field.Label>City</Field.Label>
        <Input placeholder="Enter city" />
      </Field.Root>
      <Field.Root name="state">
        <Field.Label>State</Field.Label>
        <Input placeholder="Enter state" />
      </Field.Root>
      <Field.Root name="zip">
        <Field.Label>Zip</Field.Label>
        <Input placeholder="Enter zip" />
      </Field.Root>
    </Fieldset.Root>
  );
}

export function DisabledFieldset() {
  return (
    <Fieldset.Root disabled>
      <Fieldset.Legend>Disabled Section</Fieldset.Legend>
      <Field.Root name="field1">
        <Field.Label>Field 1</Field.Label>
        <Input placeholder="Disabled input" />
      </Field.Root>
      <Field.Root name="field2">
        <Field.Label>Field 2</Field.Label>
        <Input placeholder="Also disabled" />
      </Field.Root>
    </Fieldset.Root>
  );
}
