import { render, screen, cleanup } from "@testing-library/react";
import { describe, it, expect, afterEach } from "vitest"

import Content, { Todo } from "./Content"

afterEach(() => {
  cleanup()
})

describe("Content Component", () => {
  it("render properly todo", async () => {
    let mock_todos: Todo[] = [
      {
        id: 1,
        title: "react testing mock data",
        isComplete: false
      }
    ]
  
      render(<Content todos={mock_todos} />)
      screen.debug()
    
      expect(screen.findByText('react testing mock data')).toBeInTheDocument()
      // expect(screen).toContain('react testing mock data')
  })
})

