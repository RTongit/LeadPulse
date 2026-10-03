# LeadPulse

Meta Lead Ads + React Native PoC

## Overview

LeadPulse is a proof of concept that receives a lead from Meta Lead Ads
and displays it in an already-open React Native application in real time
with the help of webhook notifications.

## How It Works

1. A test lead is submitted using Meta's Lead Testing Tool.
2. Meta sends a webhook notification to the secure HTTPS backend endpoint.
3. The backend extracts the `leadgen_id` from the request payload.
4. The backend requests the lead details from the Meta Graph API using the
   `leadgen_id` and Page Access Token.
5. The backend emits the lead information, such as name and email,
   through Socket.IO.
6. The React Native app receives the event.
7. The app updates its state and displays the new lead in real time.

## Tech Stack

- React Native
- Node.js
- Express.js
- Socket.IO
- Meta Webhooks
- Meta Graph API

## Assumptions

- The Meta Lead Testing Tool is used instead of a real advertisement.
- The React Native application is already open when the test lead is submitted.
- The Page Access Token and webhook verification token are stored as environment variables.
