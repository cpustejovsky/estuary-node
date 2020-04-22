import React from "react";

export default function Footer() {
  return (
    <footer className="site__footer">
      Cpustejovsky <i class="far fa-thumbs-up"></i>, {new Date().getFullYear()}
    </footer>
  );
}
