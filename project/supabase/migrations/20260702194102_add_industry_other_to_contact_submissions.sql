/*
# Add industry_other column to contact_submissions

## Changes
- Add `industry_other` (text, nullable) column to `contact_submissions`
- Used when user selects "Other" in the industry dropdown and provides a custom value

## Purpose
Allows storing custom industry values when the user selects "Other" from the dropdown.
*/

ALTER TABLE contact_submissions
ADD COLUMN IF NOT EXISTS industry_other text;
