defmodule PhoenixUjs do
  import Phoenix.HTML.Tag, only: [tag: 2, content_tag: 3]
  import Plug.CSRFProtection, only: [get_csrf_token: 0]

  @expected_keys [:method, :remote, :confirm]

  def ujs_init do
    tag(:meta, name: "ujs-csrf", content: get_csrf_token(), ujs_param: "_csrf_token")
  end

  def ujs_link(text, href) do
    ujs_link(text, href, [])
  end

  def ujs_link(text, _href, _opts) when is_nil(text) do
    raise ArgumentError, "expected non-nil value for text in ujs_link/3, got: #{inspect text}"
  end

  def ujs_link(_text, href, _opts) when is_nil(href) do
    raise ArgumentError, "expected non-nil value for href in ujs_link/3, got: #{inspect href}"
  end

  def ujs_link(text, href, opts) when is_list(opts) do
    ujs_attrs = Enum.reduce(@expected_keys, [], fn(k, acc) ->
      if opts[k], do: acc ++ [{:"ujs_#{k}", opts[k]}], else: acc
    end)

    if Enum.empty?(ujs_attrs) do
      raise ArgumentError, "expected non-nil value for #{ Enum.join(@expected_keys, " or ") } in ujs_link/3. For a regular link use Phoenix.HTML.link"
    end

    tag_attrs = [href: href] ++ ujs_attrs ++ Keyword.drop(opts, @expected_keys)

    content_tag(:a, text, tag_attrs)
  end
end
