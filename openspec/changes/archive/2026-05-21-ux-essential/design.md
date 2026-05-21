# Design: UX Essential Fixes

## 1. Navbar — Add logout button

```jsx
{userData && (
  <button onClick={() => { onCerrarSesion(); closeMenu(); }} className="logout-button">
    Logout
  </button>
)}
```

Style with existing `.btn-dark` mixin or new styles in navbar.scss.

## 2. Contact form — Add state + submit handler

Both Home.jsx and Contact.jsx need the same pattern:

```jsx
const [formData, setFormData] = useState({ name: '', email: '', message: '' });
const [status, setStatus] = useState({ type: '', text: '' });

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await fetch(`${API_BASE_URL}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    if (data.success) {
      setStatus({ type: 'success', text: 'Message sent!' });
      setFormData({ name: '', email: '', message: '' });
    } else {
      setStatus({ type: 'error', text: data.error });
    }
  } catch {
    setStatus({ type: 'error', text: 'Connection error' });
  }
};
```

## 3. Backend — POST /api/contact

```js
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email and message are required' });
  }
  console.log('Contact form submission:', { name, email, message });
  res.json({ success: true, message: 'Message received' });
});
```

## 4. public/404.html — GitHub Pages redirect

Standard SPA redirect: save path in sessionStorage, redirect to index.html which reads it.

## 5. Fix Auth.jsx — Remove unused useEffect import

```diff
- import React, { useState, useEffect } from 'react';
+ import { useState } from 'react';
```
