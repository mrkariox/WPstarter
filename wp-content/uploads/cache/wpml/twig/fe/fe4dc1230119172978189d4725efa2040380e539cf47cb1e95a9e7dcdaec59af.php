<?php

/* media-translation.twig */
class __TwigTemplate_a76d1ec8958b09457e8c7767569e09c62926eab9fa4792b35320b2c480bd25c6 extends Twig_Template
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
        echo "<div class=\"wrap\">

    <h2>";
        // line 3
        echo twig_escape_filter($this->env, $this->getAttribute(($context["strings"] ?? null), "heading", array()), "html", null, true);
        echo "</h2>

    ";
        // line 5
        $this->loadTemplate("batch-translation.twig", "media-translation.twig", 5)->display(array_merge($context, ($context["batch_translation"] ?? null)));
        // line 6
        echo "
    <div class=\"tablenav top wpml-media-tablenav\">
        ";
        // line 8
        $this->loadTemplate("media-translation-filters.twig", "media-translation.twig", 8)->display($context);
        // line 9
        echo "    </div>

    <table class=\"widefat striped wpml-media-table js-otgs-table-sticky-header\">
        <thead>
        <tr>
            <th class=\"wpml-col-media-title\">";
        // line 14
        echo twig_escape_filter($this->env, $this->getAttribute(($context["strings"] ?? null), "original_language", array()), "html", null, true);
        echo "</th>
            <th class=\"wpml-col-media-translations\">
                ";
        // line 16
        $context['_parent'] = $context;
        $context['_seq'] = twig_ensure_traversable(($context["languages"] ?? null));
        foreach ($context['_seq'] as $context["code"] => $context["language"]) {
            // line 17
            echo "                    ";
            if ((twig_test_empty(($context["target_language"] ?? null)) || (($context["target_language"] ?? null) == $context["code"]))) {
                // line 18
                echo "                        <span class=\"js-wpml-popover-tooltip\" title=\"";
                echo twig_escape_filter($this->env, $this->getAttribute($context["language"], "name", array()), "html", null, true);
                echo "\"><img src=\"";
                echo twig_escape_filter($this->env, $this->getAttribute($context["language"], "flag", array()), "html", null, true);
                echo "\"
                                                                                               width=\"16\" height=\"12\"
                                                                                               alt=\"";
                // line 20
                echo twig_escape_filter($this->env, $this->getAttribute($context["language"], "code", array()), "html", null, true);
                echo "\"></span>
                    ";
            }
            // line 22
            echo "                ";
        }
        $_parent = $context['_parent'];
        unset($context['_seq'], $context['_iterated'], $context['code'], $context['language'], $context['_parent'], $context['loop']);
        $context = array_intersect_key($context, $_parent) + $_parent;
        // line 23
        echo "            </th>
        </tr>
        </thead>
        <tbody>
        ";
        // line 27
        if (($context["attachments"] ?? null)) {
            // line 28
            echo "            ";
            $context['_parent'] = $context;
            $context['_seq'] = twig_ensure_traversable(($context["attachments"] ?? null));
            foreach ($context['_seq'] as $context["_key"] => $context["attachment"]) {
                // line 29
                echo "                ";
                $this->loadTemplate("media-translation-table-row.twig", "media-translation.twig", 29)->display(array("attachment" => $context["attachment"], "languages" => ($context["languages"] ?? null), "strings" => ($context["strings"] ?? null), "target_language" => ($context["target_language"] ?? null)));
                // line 30
                echo "            ";
            }
            $_parent = $context['_parent'];
            unset($context['_seq'], $context['_iterated'], $context['_key'], $context['attachment'], $context['_parent'], $context['loop']);
            $context = array_intersect_key($context, $_parent) + $_parent;
            // line 31
            echo "        ";
        } else {
            // line 32
            echo "            <tr>
                <td colspan=\"2\">";
            // line 33
            echo twig_escape_filter($this->env, $this->getAttribute(($context["strings"] ?? null), "no_attachments", array()), "html", null, true);
            echo "</td>
            </tr>
        ";
        }
        // line 36
        echo "        </tbody>

    </table>

    <div class=\"tablenav bottom\">
        ";
        // line 41
        $this->loadTemplate("pagination.twig", "media-translation.twig", 41)->display(array("pagination_model" => ($context["pagination"] ?? null)));
        // line 42
        echo "
        ";
        // line 43
        $this->loadTemplate("media-translation-popup.twig", "media-translation.twig", 43)->display($context);
        // line 44
        echo "
    </div>

</div>";
    }

    public function getTemplateName()
    {
        return "media-translation.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  122 => 44,  120 => 43,  117 => 42,  115 => 41,  108 => 36,  102 => 33,  99 => 32,  96 => 31,  90 => 30,  87 => 29,  82 => 28,  80 => 27,  74 => 23,  68 => 22,  63 => 20,  55 => 18,  52 => 17,  48 => 16,  43 => 14,  36 => 9,  34 => 8,  30 => 6,  28 => 5,  23 => 3,  19 => 1,);
    }

    /** @deprecated since 1.27 (to be removed in 2.0). Use getSourceContext() instead */
    public function getSource()
    {
        @trigger_error('The '.__METHOD__.' method is deprecated since version 1.27 and will be removed in 2.0. Use getSourceContext() instead.', E_USER_DEPRECATED);

        return $this->getSourceContext()->getCode();
    }

    public function getSourceContext()
    {
        return new Twig_Source("", "media-translation.twig", "E:\\Programy\\wamp64\\www\\WPstarter\\wp-content\\plugins\\wpml-media-translation\\templates\\menus\\media-translation.twig");
    }
}
