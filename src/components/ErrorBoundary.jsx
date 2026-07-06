import { Component } from "react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    if (import.meta.env.DEV) {
      console.error("[ErrorBoundary] Caught:", error);
      console.error("[ErrorBoundary] Component stack:", errorInfo.componentStack);
    }
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          role="alert"
          className="
            min-h-screen
            flex
            items-center
            justify-center
            bg-background
            px-[6%]
          "
        >
          <div
            className="
              w-full
              max-w-xl
              rounded-[36px]
              border
              border-black/5
              dark:border-white/10
              bg-white/70
              dark:bg-white/[0.04]
              backdrop-blur-xl
              px-10
              py-16
              text-center
            "
          >
            <div
              className="
                inline-flex
                items-center
                px-4
                py-2
                rounded-2xl
                border
                border-black/5
                dark:border-white/10
                bg-slate-900/[0.03]
                dark:bg-white/[0.03]
                text-blue-500
                dark:text-blue-300
                text-sm
                tracking-[0.2em]
                uppercase
                mb-8
              "
            >
              Error
            </div>

            <h1
              className="
                text-4xl
                sm:text-5xl
                font-black
                leading-[0.95]
                tracking-tight
                text-foreground
                dark:text-white
                mb-6
              "
            >
              Something
              <span
                className="
                  bg-gradient-to-r
                  from-blue-400
                  via-cyan-300
                  to-blue-500
                  bg-clip-text
                  text-transparent
                  block
                  mt-2
                "
              >
                Went Wrong
              </span>
            </h1>

            <p
              className="
                text-muted
                dark:text-gray-400
                text-lg
                leading-relaxed
                mb-10
                max-w-md
                mx-auto
              "
            >
              An unexpected error occurred. Please reload the page to continue.
            </p>

            <button
              onClick={this.handleReload}
              className="
                inline-flex
                items-center
                gap-3
                px-8
                py-4
                rounded-2xl
                bg-gradient-to-r
                from-blue-500
                to-cyan-400
                text-white
                font-semibold
                shadow-[0_0_25px_rgba(59,130,246,0.35)]
                transition-all
                duration-300
                hover:scale-[1.03]
                hover:shadow-[0_0_40px_rgba(59,130,246,0.55)]
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-blue-400
                focus-visible:ring-offset-2
                focus-visible:ring-offset-background
                cursor-pointer
              "
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
