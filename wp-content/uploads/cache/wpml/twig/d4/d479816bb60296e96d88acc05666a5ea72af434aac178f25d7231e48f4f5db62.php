<?php

/* table-nav-arrow.twig */
class __TwigTemplate_bdd460ad446c6eab48a27fde996b05dffc0e50736a005fd7f9cf98e9d9d8e102 extends Twig_Template
{
    public function __construct(Twig_Environment $env)
    {
        parent::__construct($env);

        $this->parent = false;

        $this->blocks = array(
        );
    }

    protected function doDisplay(array $context, array $blocks = array())
    {
        // line 1
        $context["arrows"] = array("first-page" => "«", "previous-page" => "‹", "next-page" => "›", "last-page" => "»");
        // line 8
        echo "
";
        // line 9
        if (($context["url"] ?? null)) {
            // line 10
            echo "    <a class=\"";
            echo twig_escape_filter($this->env, ($context["class"] ?? null), "html", null, true);
            echo "\" href=\"";
            echo twig_escape_filter($this->env, ($context["url"] ?? null), "html", null, true);
            echo "\">
        <span class=\"screen-reader-text\">";
            // line 11
            echo twig_escape_filter($this->env, ($context["label"] ?? null), "html", null, true);
            echo "</span><span aria-hidden=\"true\">";
            echo twig_escape_filter($this->env, $this->getAttribute(($context["arrows"] ?? null), ($context["class"] ?? null), array(), "array"), "html", null, true);
            echo "</span>
    </a>
";
        } else {
            // line 14
            echo "    <span class=\"tablenav-pages-navspan\" aria-hidden=\"true\">";
            echo twig_escape_filter($this->env, $this->getAttribute(($context["arrows"] ?? null), ($context["class"] ?? null), array(), "array"), "html", null, true);
            echo "</span>
";
        }
    }

    public function getTemplateName()
    {
        return "table-nav-arrow.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  41 => 14,  33 => 11,  26 => 10,  24 => 9,  21 => 8,  19 => 1,);
    }

    /** @deprecated since 1.27 (to be removed in 2.0). Use getSourceContext() instead */
    public function getSource()
    {
        @trigger_error('The '.__METHOD__.' method is deprecated since version 1.27 and will be removed in 2.0. Use getSourceContext() instead.', E_USER_DEPRECATED);

        return $this->getSourceContext()->getCode();
    }

    public function getSourceContext()
    {
        return new Twig_Source("", "table-nav-arrow.twig", "E:\\Programy\\wamp64\\www\\WPstarter\\wp-content\\plugins\\sitepress-multilingual-cms\\templates\\pagination\\table-nav-arrow.twig");
    }
}
