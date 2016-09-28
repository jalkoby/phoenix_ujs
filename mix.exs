defmodule PhoenixUjs.Mixfile do
  use Mix.Project

  @version "0.1.0"

  def project do
    [
      app: :phoenix_ujs,
      version: @version,
      elixir: "~> 1.0",
      deps: deps(),

      name: "Phoenix.ujs",
      package: package(),
      docs: []
   ]
  end

  def application do
    [applications: [:logger, :plug]]
  end

  defp deps do
    [
      {:plug, "~> 1.0"},
      {:phoenix_html, "~> 2.0"}
    ]
  end

  defp package do
    [
      maintainers: ["Sergey Pchelintsev"],
      licenses: ["MIT"],
      links: %{github: "https://github.com/jalkoby/phoenix_ujs"},
      files: ~w(lib priv web) ++
             ~w(LICENSE mix.exs package.json README.md)]
  end
end
