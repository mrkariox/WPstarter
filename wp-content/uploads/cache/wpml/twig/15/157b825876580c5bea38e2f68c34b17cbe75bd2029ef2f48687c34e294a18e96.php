<?php

/* media-translation-filters.twig */
class __TwigTemplate_d1bf476d65f104083fed541c5b73740063c6e548843558ad28c93250c2da05e6 extends Twig_Template
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
        echo "<form id=\"posts-filter\" method=\"get\">
    <input type=\"hidden\" name=\"page\" value=\"wpml-media\"/>
    <input type=\"hidden\" name=\"sm\" value=\"media-translation\"/>
    ";
        // line 4
        echo ($context["nonce"] ?? null);
        echo "
    <label for=\"filter-by-date\" class=\"screen-reader-text\">";
        // line 5
        echo twig_escape_filter($this->env, $this->getAttribute(($context["strings"] ?? null), "filter_by_date", array()), "html", null, true);
        echo "</label>
    <select id=\"filter-by-date\" name=\"m\">
        <option ";
        // line 7
        if ((($context["selected_month"] ?? null) == 0)) {
            echo "selected=\"selected\"";
        }
        // line 8
        echo "                value=\"0\">";
        echo twig_escape_filter($this->env, $this->getAttribute(($context["strings"] ?? null), "all_dates", array()), "html", null, true);
        echo "</option>
        ";
        // line 9
        $context['_parent'] = $context;
        $context['_seq'] = twig_ensure_traversable(($context["months"] ?? null));
        foreach ($context['_seq'] as $context["_key"] => $context["month"]) {
            // line 10
            echo "            <option ";
            if ((($context["selected_month"] ?? null) == $this->getAttribute($context["month"], "id", array()))) {
                echo "selected=\"selected\"";
            }
            // line 11
            echo "                    value=\"";
            echo twig_escape_filter($this->env, $this->getAttribute($context["month"], "id", array()), "html", null, true);
            echo "\">";
            echo twig_escape_filter($this->env, $this->getAttribute($context["month"], "label", array()), "html", null, true);
            echo "</option>
        ";
        }
        $_parent = $context['_parent'];
        unset($context['_seq'], $context['_iterated'], $context['_key'], $context['month'], $context['_parent'], $context['loop']);
        $context = array_intersect_key($context, $_parent) + $_parent;
        // line 13
        echo "    </select>
    ";
        // line 14
        echo twig_escape_filter($this->env, $this->getAttribute(($context["strings"] ?? null), "in", array()), "html", null, true);
        echo "
    <label for=\"filter-by-language\" class=\"screen-reader-text\">";
        // line 15
        echo twig_escape_filter($this->env, $this->getAttribute(($context["strings"] ?? null), "filter_by_language", array()), "html", null, true);
        echo "</label>
    <select id=\"filter-by-language\" name=\"slang\">
        <option value=\"\">";
        // line 17
        echo twig_escape_filter($this->env, $this->getAttribute(($context["strings"] ?? null), "any_language", array()), "html", null, true);
        echo "</option>
        ";
        // line 18
        $context['_parent'] = $context;
        $context['_seq'] = twig_ensure_traversable(($context["languages"] ?? null));
        foreach ($context['_seq'] as $context["code"] => $context["language"]) {
            // line 19
            echo "            <option ";
            if ((($context["from_language"] ?? null) == $context["code"])) {
                echo "selected=\"selected\"";
            }
            // line 20
            echo "                    value=\"";
            echo twig_escape_filter($this->env, $context["code"], "html", null, true);
            echo "\">";
            echo twig_escape_filter($this->env, $this->getAttribute($context["language"], "name", array()), "html", null, true);
            echo "</option>
        ";
        }
        $_parent = $context['_parent'];
        unset($context['_seq'], $context['_iterated'], $context['code'], $context['language'], $context['_parent'], $context['loop']);
        $context = array_intersect_key($context, $_parent) + $_parent;
        // line 22
        echo "    </select>
    ";
        // line 23
        echo twig_escape_filter($this->env, $this->getAttribute(($context["strings"] ?? null), "to", array()), "html", null, true);
        echo "
    <select id=\"filter-by-language\" name=\"tlang\">
        <option value=\"\">";
        // line 25
        echo twig_escape_filter($this->env, $this->getAttribute(($context["strings"] ?? null), "any_language", array()), "html", null, true);
        echo "</option>
        ";
        // line 26
        $context['_parent'] = $context;
        $context['_seq'] = twig_ensure_traversable(($context["languages"] ?? null));
        foreach ($context['_seq'] as $context["code"] => $context["language"]) {
            // line 27
            echo "            <option ";
            if ((($context["to_language"] ?? null) == $context["code"])) {
                echo "selected=\"selected\"";
            }
            // line 28
            echo "                    value=\"";
            echo twig_escape_filter($this->env, $context["code"], "html", null, true);
            echo "\">";
            echo twig_escape_filter($this->env, $this->getAttribute($context["language"], "name", array()), "html", null, true);
            echo "</option>
        ";
        }
        $_parent = $context['_parent'];
        unset($context['_seq'], $context['_iterated'], $context['code'], $context['language'], $context['_parent'], $context['loop']);
        $context = array_intersect_key($context, $_parent) + $_parent;
        // line 30
        echo "    </select>

    <label for=\"filter-by-translation-status\" class=\"screen-reader-text\">";
        // line 32
        echo twig_escape_filter($this->env, $this->getAttribute(($context["strings"] ?? null), "filter_by_status", array()), "html", null, true);
        echo "</label>
    <select id=\"filter-by-translation-status\" name=\"status\">
        <option ";
        // line 34
        if ((twig_length_filter($this->env, ($context["selected_status"] ?? null)) == 0)) {
            echo "selected=\"selected\"";
        }
        // line 35
        echo "                value=\"\">";
        echo twig_escape_filter($this->env, $this->getAttribute(($context["strings"] ?? null), "status_all", array()), "html", null, true);
        echo "</option>
        <option ";
        // line 36
        if (((($context["selected_status"] ?? null) == $this->getAttribute(($context["statuses"] ?? null), "not_translated", array())) && (twig_length_filter($this->env, ($context["selected_status"] ?? null)) > 0))) {
            echo "selected=\"selected\"";
        }
        // line 37
        echo "                value=\"";
        echo twig_escape_filter($this->env, $this->getAttribute(($context["statuses"] ?? null), "not_translated", array()), "html", null, true);
        echo "\">";
        echo twig_escape_filter($this->env, $this->getAttribute(($context["strings"] ?? null), "status_not", array()), "html", null, true);
        echo "</option>
        <option ";
        // line 38
        if (((($context["selected_status"] ?? null) == $this->getAttribute(($context["statuses"] ?? null), "in_progress", array())) && (twig_length_filter($this->env, ($context["selected_status"] ?? null)) > 0))) {
            echo "selected=\"selected\"";
        }
        // line 39
        echo "                value=\"";
        echo twig_escape_filter($this->env, $this->getAttribute(($context["statuses"] ?? null), "in_progress", array()), "html", null, true);
        echo "\">";
        echo twig_escape_filter($this->env, $this->getAttribute(($context["strings"] ?? null), "status_in_progress", array()), "html", null, true);
        echo "</option>
        <option ";
        // line 40
        if ((($context["selected_status"] ?? null) == $this->getAttribute(($context["statuses"] ?? null), "translated", array()))) {
            echo "selected=\"selected\"";
        }
        // line 41
        echo "                value=\"";
        echo twig_escape_filter($this->env, $this->getAttribute(($context["statuses"] ?? null), "translated", array()), "html", null, true);
        echo "\">";
        echo twig_escape_filter($this->env, $this->getAttribute(($context["strings"] ?? null), "status_translated", array()), "html", null, true);
        echo "</option>
        <option ";
        // line 42
        if ((($context["selected_status"] ?? null) == $this->getAttribute(($context["statuses"] ?? null), "needs_translation", array()))) {
            echo "selected=\"selected\"";
        }
        // line 43
        echo "                value=\"";
        echo twig_escape_filter($this->env, $this->getAttribute(($context["statuses"] ?? null), "needs_translation", array()), "html", null, true);
        echo "\">";
        echo twig_escape_filter($this->env, $this->getAttribute(($context["strings"] ?? null), "status_needs_translation", array()), "html", null, true);
        echo "</option>
    </select>

    <label class=\"screen-reader-text\" for=\"media-search-input\">";
        // line 46
        echo twig_escape_filter($this->env, $this->getAttribute(($context["strings"] ?? null), "search_media", array()), "html", null, true);
        echo "</label>
    <input size=\"25\" type=\"search\" id=\"media-search-input\" placeholder=\"";
        // line 47
        echo twig_escape_filter($this->env, $this->getAttribute(($context["strings"] ?? null), "search_placeholder", array()), "html", null, true);
        echo "\" name=\"s\"
           value=\"";
        // line 48
        echo twig_escape_filter($this->env, ($context["search"] ?? null), "html", null, true);
        echo "\">
    <input type=\"submit\" class=\"button action\" value=\"";
        // line 49
        echo twig_escape_filter($this->env, $this->getAttribute(($context["strings"] ?? null), "search_button_label", array()), "html", null, true);
        echo "\">
</form>";
    }

    public function getTemplateName()
    {
        return "media-translation-filters.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  206 => 49,  202 => 48,  198 => 47,  194 => 46,  185 => 43,  181 => 42,  174 => 41,  170 => 40,  163 => 39,  159 => 38,  152 => 37,  148 => 36,  143 => 35,  139 => 34,  134 => 32,  130 => 30,  119 => 28,  114 => 27,  110 => 26,  106 => 25,  101 => 23,  98 => 22,  87 => 20,  82 => 19,  78 => 18,  74 => 17,  69 => 15,  65 => 14,  62 => 13,  51 => 11,  46 => 10,  42 => 9,  37 => 8,  33 => 7,  28 => 5,  24 => 4,  19 => 1,);
    }

    /** @deprecated since 1.27 (to be removed in 2.0). Use getSourceContext() instead */
    public function getSource()
    {
        @trigger_error('The '.__METHOD__.' method is deprecated since version 1.27 and will be removed in 2.0. Use getSourceContext() instead.', E_USER_DEPRECATED);

        return $this->getSourceContext()->getCode();
    }

    public function getSourceContext()
    {
        return new Twig_Source("", "media-translation-filters.twig", "E:\\Programy\\wamp64\\www\\WPstarter\\wp-content\\plugins\\wpml-media-translation\\templates\\menus\\media-translation-filters.twig");
    }
}
