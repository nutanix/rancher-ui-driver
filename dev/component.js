"use strict";

define("nodes/components/driver-nutanix/component", ["exports", "shared/mixins/node-driver"], function (exports, _nodeDriver) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  const LAYOUT = "PHNlY3Rpb24gY2xhc3M9Imhvcml6b250YWwtZm9ybSI+CiAgPGRpdiBjbGFzcz0iY29udGFpbmVyLWZsdWlkIj4KCiAgICB7eyEtLSBUaGlzIGxpbmUgc2hvd3MgdGhlIGRyaXZlciB0aXRsZSB3aGljaCB5b3UgZG9uJ3QgaGF2ZSB0byBjaGFuZ2UgaXQgLS19fQogICAgPGRpdiBjbGFzcz0ib3Zlci1ociI+PHNwYW4+e3tkcml2ZXJPcHRpb25zVGl0bGV9fTwvc3Bhbj48L2Rpdj4KICAgIDxkaXYgY2xhc3M9Im92ZXItaHIiPjxzcGFuPnt7ZHJpdmVyQ29udGVudFRpdGxlfX08L3NwYW4+PC9kaXY+CgoKICAgIHt7I2FjY29yZGlvbi1saXN0IHNob3dFeHBhbmRBbGw9ZmFsc2UgYXMgfCBhbCBleHBhbmRGbiB8IH19CiAgICB7eyNhY2NvcmRpb24tbGlzdC1pdGVtCiAgICB0aXRsZT0iMS4gQWNjb3VudCBBY2Nlc3MiCiAgICBkZXRhaWw9IkNvbmZpZ3VyZSB0byBjb25uZWN0IHRvIHRoZSBOdXRhbml4IFByaXNtIENlbnRyYWwgSW5zdGFuY2UiCiAgICBleHBhbmRPbkluaXQ9dHJ1ZQogICAgZXhwYW5kPShhY3Rpb24gZXhwYW5kRm4pCiAgICB9fQoKICAgIDxkaXYgY2xhc3M9InJvdyI+CiAgICAgIDxkaXYgY2xhc3M9ImNvbCBzcGFuLTEyIj4KICAgICAgICA8bGFiZWwgY2xhc3M9ImFjYy1sYWJlbCI+TWFuYWdlbWVudCBFbmRwb2ludAogICAgICAgICAgPHNwYW4gY2xhc3M9ImZpZWxkLXJlcXVpcmVkIGVtYmVyLXZpZXciPio8L3NwYW4+CiAgICAgICAgPC9sYWJlbD4KICAgICAgICB7e2lucHV0IHR5cGU9InRleHQiCiAgICAgICAgY2xhc3M9ImZvcm0tY29udHJvbCIKICAgICAgICB2YWx1ZT1tb2RlbC5udXRhbml4Q29uZmlnLmVuZHBvaW50CiAgICAgICAgfX0KICAgICAgICA8cCBjbGFzcz0iaGVscC1ibG9jayI+TnV0YW5peCBQcmlzbSBDZW50cmFsIGFkZHJlc3M8L3A+CiAgICAgIDwvZGl2PgoKICAgIDwvZGl2PgoKICAgIDxkaXYgY2xhc3M9InJvdyI+CiAgICAgIDxkaXYgY2xhc3M9ImNvbCBzcGFuLTYiPgogICAgICAgIDxsYWJlbCBjbGFzcz0iYWNjLWxhYmVsIj5Vc2VybmFtZQogICAgICAgICAgPHNwYW4gY2xhc3M9ImZpZWxkLXJlcXVpcmVkIGVtYmVyLXZpZXciPio8L3NwYW4+CiAgICAgICAgPC9sYWJlbD4KICAgICAgICB7e2lucHV0CiAgICAgICAgdHlwZT0idGV4dCIKICAgICAgICBjbGFzcz0iZm9ybS1jb250cm9sIgogICAgICAgIHZhbHVlPW1vZGVsLm51dGFuaXhDb25maWcudXNlcm5hbWUKICAgICAgICB9fQogICAgICAgIDxwIGNsYXNzPSJoZWxwLWJsb2NrIj5OdXRhbml4IG1hbmFnZW1lbnQgdXNlcm5hbWU8L3A+CiAgICAgIDwvZGl2PgogICAgICA8ZGl2IGNsYXNzPSJjb2wgc3Bhbi02Ij4KICAgICAgICA8bGFiZWwgY2xhc3M9ImFjYy1sYWJlbCI+UGFzc3dvcmQKICAgICAgICAgIDxzcGFuIGNsYXNzPSJmaWVsZC1yZXF1aXJlZCBlbWJlci12aWV3Ij4qPC9zcGFuPgogICAgICAgIDwvbGFiZWw+CiAgICAgICAge3tpbnB1dAogICAgICAgIHR5cGU9InBhc3N3b3JkIgogICAgICAgIGNsYXNzPSJmb3JtLWNvbnRyb2wiCiAgICAgICAgdmFsdWU9bW9kZWwubnV0YW5peENvbmZpZy5wYXNzd29yZAogICAgICAgIH19CiAgICAgICAgPHAgY2xhc3M9ImhlbHAtYmxvY2siPk51dGFuaXggbWFuYWdlbWVudCBwYXNzd29yZDwvcD4KICAgICAgPC9kaXY+CiAgICA8L2Rpdj4KCiAgICA8ZGl2IGNsYXNzPSJjb2wtbWQtMiI+CiAgICAgIDxkaXYgY2xhc3M9ImNoZWNrYm94Ij4KICAgICAgICA8bGFiZWwgY2xhc3M9ImFjYy1sYWJlbCI+e3tpbnB1dCB0eXBlPSJjaGVja2JveCIgY2hlY2tlZD1tb2RlbC5udXRhbml4Q29uZmlnLmluc2VjdXJlfX0KICAgICAgICAgIEFsbG93IGluc2VjdXJlIGNvbW11bmljYXRpb24gdG8gdGhlIGVuZHBvaW50CiAgICAgICAgPC9sYWJlbD4KICAgICAgPC9kaXY+CiAgICA8L2Rpdj4KCiAgICB7ey9hY2NvcmRpb24tbGlzdC1pdGVtfX0KICAgIHt7I2FjY29yZGlvbi1saXN0LWl0ZW0KICAgIHRpdGxlPSIyLiBTY2hlZHVsaW5nIgogICAgZGV0YWlsPSJDaG9vc2Ugd2hhdCBjbHVzdGVyIHRoZSB2aXJ0dWFsIG1hY2hpbmUgd2lsbCBiZSBzY2hlZHVsZWQgdG8iCiAgICBleHBhbmRPbkluaXQ9dHJ1ZQogICAgZXhwYW5kPShhY3Rpb24gZXhwYW5kRm4pCiAgICB9fQogICAgPGRpdiBjbGFzcz0icm93Ij4KICAgICAgPGRpdiBjbGFzcz0iY29sLW1kLTIgZm9ybS1sYWJlbCI+CiAgICAgICAgPGxhYmVsIGNsYXNzPSJhY2MtbGFiZWwiPkNsdXN0ZXIKICAgICAgICAgIDxzcGFuIGNsYXNzPSJmaWVsZC1yZXF1aXJlZCBlbWJlci12aWV3Ij4qPC9zcGFuPgogICAgICAgIDwvbGFiZWw+CiAgICAgIDwvZGl2PgogICAgICA8ZGl2IGNsYXNzPSJjb2wtbWQtNCI+CiAgICAgICAge3tpbnB1dCB0eXBlPSJ0ZXh0IgogICAgICAgIGNsYXNzPSJmb3JtLWNvbnRyb2wiCiAgICAgICAgdmFsdWU9bW9kZWwubnV0YW5peENvbmZpZy5jbHVzdGVyCiAgICAgICAgfX0KICAgICAgPC9kaXY+CiAgICAgIDxkaXYgY2xhc3M9ImNvbC1zbS0xMiBjb2wtbWQtNCI+CiAgICAgICAgPHAgY2xhc3M9ImhlbHAtYmxvY2siPlRoZSBuYW1lIG9mIHRoZSBjbHVzdGVyIHdoZXJlIGRlcGxveSB2aXJ0dWFsIG1hY2hpbmUuPC9wPgogICAgICA8L2Rpdj4KICAgIDwvZGl2PgoKCgogICAge3svYWNjb3JkaW9uLWxpc3QtaXRlbX19CiAgICB7eyNhY2NvcmRpb24tbGlzdC1pdGVtCiAgICB0aXRsZT0iMy4gSW5zdGFuY2UiCiAgICBkZXRhaWw9IkNob29zZSB0aGUgc2l6ZSBhbmQgT1Mgb2YgdGhlIHZpcnR1YWwgbWFjaGluZSIKICAgIGV4cGFuZE9uSW5pdD10cnVlCiAgICBleHBhbmQ9KGFjdGlvbiBleHBhbmRGbikKICAgIH19CgogICAgPGRpdiBjbGFzcz0icm93Ij4KICAgICAgPGRpdiBjbGFzcz0iY29sIHNwYW4tNiI+CiAgICAgICAgPGxhYmVsIGNsYXNzPSJhY2MtbGFiZWwiPkNQVXM8L2xhYmVsPgogICAgICAgIDxkaXYgY2xhc3M9ImlucHV0LWdyb3VwIj4KICAgICAgICAgIHt7aW5wdXQtaW50ZWdlcgogICAgICAgICAgbWluPTEKICAgICAgICAgIG1heD0zMgogICAgICAgICAgdmFsdWU9bW9kZWwubnV0YW5peENvbmZpZy52bUNwdXMKICAgICAgICAgIGNsYXNzTmFtZXM9ImZvcm0tY29udHJvbCIKICAgICAgICAgIH19CiAgICAgICAgICA8ZGl2IGNsYXNzPSJpbnB1dC1ncm91cC1hZGRvbiBiZy1kZWZhdWx0Ij4KICAgICAgICAgICAge3t0ICJub2RlRHJpdmVyLmhhcnZlc3Rlci5jcHVDb3VudC51bml0IiBjb3Jlcz1jb25maWcudm1DcHVzfX0KICAgICAgICAgIDwvZGl2PgogICAgICAgIDwvZGl2PgogICAgICAgIDxsYWJlbCBjbGFzcz0iYWNjLWxhYmVsIj57e2lucHV0IHR5cGU9ImNoZWNrYm94IiBjaGVja2VkPW1vZGVsLm51dGFuaXhDb25maWcudm1DcHVQYXNzdGhyb3VnaH19CiAgICAgICAgICBQYXNzdGhyb3VnaCB0aGUgaG9zdCdzIENQVSBmZWF0dXJlcyB0byB0aGUgVk0KICAgICAgICA8L2xhYmVsPgogICAgICA8L2Rpdj4KICAgICAgPGRpdiBjbGFzcz0iY29sIHNwYW4tNiI+CiAgICAgICAgPGxhYmVsIGNsYXNzPSJhY2MtbGFiZWwiPk1lbW9yeTwvbGFiZWw+CiAgICAgICAgPGRpdiBjbGFzcz0iaW5wdXQtZ3JvdXAiPgogICAgICAgICAge3tpbnB1dC1pbnRlZ2VyCiAgICAgICAgICBtaW49MQogICAgICAgICAgdmFsdWU9bW9kZWwubnV0YW5peENvbmZpZy52bU1lbQogICAgICAgICAgY2xhc3NOYW1lcz0iZm9ybS1jb250cm9sIgogICAgICAgICAgfX0KICAgICAgICAgIDxkaXYgY2xhc3M9ImlucHV0LWdyb3VwLWFkZG9uIGJnLWRlZmF1bHQiPk1CPC9kaXY+CiAgICAgICAgPC9kaXY+CiAgICAgIDwvZGl2PgogICAgPC9kaXY+CgogICAgPGRpdiBjbGFzcz0icm93Ij4KICAgICAgPGRpdiBjbGFzcz0iY29sIHNwYW4tNiI+CiAgICAgICAgPGxhYmVsIGNsYXNzPSJhY2MtbGFiZWwiPlRlbXBsYXRlIEltYWdlCiAgICAgICAgICA8c3BhbiBjbGFzcz0iZmllbGQtcmVxdWlyZWQgZW1iZXItdmlldyI+Kjwvc3Bhbj4KICAgICAgICA8L2xhYmVsPgogICAgICAgIHt7aW5wdXQgdHlwZT0idGV4dCIKICAgICAgICBjbGFzcz0iZm9ybS1jb250cm9sIgogICAgICAgIHZhbHVlPW1vZGVsLm51dGFuaXhDb25maWcudm1JbWFnZQogICAgICAgIH19CiAgICAgICAgPHAgY2xhc3M9ImhlbHAtYmxvY2siPlRoZSBuYW1lIG9mIHRoZSBkaXNrIGltYWdlIHRvIHVzZSBhcyB0ZW1wbGF0ZSBmb3IgdGhlIFZNPC9wPgogICAgICA8L2Rpdj4KICAgICAgPGRpdiBjbGFzcz0iY29sIHNwYW4tNiI+CiAgICAgICAgPGxhYmVsIGNsYXNzPSJhY2MtbGFiZWwiPlZNIERpc2sgU2l6ZTwvbGFiZWw+CiAgICAgICAgPGRpdiBjbGFzcz0iaW5wdXQtZ3JvdXAiPgogICAgICAgICAge3tpbnB1dC1pbnRlZ2VyCiAgICAgICAgICBtaW49MAogICAgICAgICAgdmFsdWU9bW9kZWwubnV0YW5peENvbmZpZy52bUltYWdlU2l6ZQogICAgICAgICAgY2xhc3NOYW1lcz0iZm9ybS1jb250cm9sIgogICAgICAgICAgfX0KICAgICAgICAgIDxkaXYgY2xhc3M9ImlucHV0LWdyb3VwLWFkZG9uIGJnLWRlZmF1bHQiPkdpQjwvZGl2PgogICAgICAgIDwvZGl2PgogICAgICAgIDxwIGNsYXNzPSJoZWxwLWJsb2NrIj5TaXplIHRvIGV4dGVuZCB0aGUgdGVtcGxhdGUgZGlzay4gU2V0IHRoaXMgdG8gemVybyBpZiB5b3UgZG9uJ3Qgd2FudCB0byBleHRlbmQKICAgICAgICAgIGl0Ljxicj5SZWNvbW1lbmRlZCBpZiB5b3VyIGltYWdlIGlzIHNtYWxsZXIgdGhhbiA0MEdCPC9wPgogICAgICA8L2Rpdj4KICAgIDwvZGl2PgoKICAgIDxkaXYgY2xhc3M9InJvdyI+CiAgICAgIDxkaXYgY2xhc3M9ImNvbCBzcGFuLTYiPgogICAgICAgIDxsYWJlbCBjbGFzcz0iYWNjLWxhYmVsIj5BZGRpdGlvbmFsIERpc2sgU2l6ZTwvbGFiZWw+CiAgICAgICAgPGRpdiBjbGFzcz0iaW5wdXQtZ3JvdXAiPgogICAgICAgICAge3tpbnB1dC1pbnRlZ2VyCiAgICAgICAgICBtaW49MAogICAgICAgICAgdmFsdWU9bW9kZWwubnV0YW5peENvbmZpZy5kaXNrU2l6ZQogICAgICAgICAgY2xhc3NOYW1lcz0iZm9ybS1jb250cm9sIgogICAgICAgICAgfX0KICAgICAgICAgIDxkaXYgY2xhc3M9ImlucHV0LWdyb3VwLWFkZG9uIGJnLWRlZmF1bHQiPkdpQjwvZGl2PgogICAgICAgIDwvZGl2PgogICAgICAgIDxwIGNsYXNzPSJoZWxwLWJsb2NrIj5TaXplIG9mIHRoZSBhZGRpdGlvbmFsIGRpc2sgdG8gYmUgcHJvdmlzaW9uZWQuIExlYXZlIHRvIHplcm8gaWYgeW91IGRvbid0IHdhbnQgdG8KICAgICAgICAgIHByb3Zpc2lvbiBhbiBleHRyYSBkaXNrLjwvcD4KICAgICAgPC9kaXY+CiAgICAgIDxkaXYgY2xhc3M9ImNvbCBzcGFuLTYiPgogICAgICAgIDxsYWJlbCBjbGFzcz0iYWNjLWxhYmVsIj5TdG9yYWdlIENvbnRhaW5lcjwvbGFiZWw+CiAgICAgICAge3tpbnB1dCB0eXBlPSJ0ZXh0IgogICAgICAgIGNsYXNzPSJmb3JtLWNvbnRyb2wiCiAgICAgICAgdmFsdWU9bW9kZWwubnV0YW5peENvbmZpZy5zdG9yYWdlQ29udGFpbmVyCiAgICAgICAgfX0KICAgICAgICA8cCBjbGFzcz0iaGVscC1ibG9jayI+VVVJRCBvZiB0aGUgc3RvcmFnZSBjb250YWluZXIgdG8gYmUgdXNlZCBmb3IgdGhlIGFkZGl0aW9uYWwgZGlzay4gTGVhdmUgZW1wdHkgaWYgeW91IGRvbid0CiAgICAgICAgICB3YW50IHRvIHByb3Zpc2lvbiBhbiBleHRyYSBkaXNrLjwvcD4KICAgICAgPC9kaXY+CiAgICA8L2Rpdj4KCiAgICA8ZGl2IGNsYXNzPSJyb3ciPgogICAgICA8ZGl2IGNsYXNzPSJjb2wgc3Bhbi02Ij4KICAgICAgICA8bGFiZWwgY2xhc3M9ImFjYy1sYWJlbCI+UHJvamVjdCBOYW1lPC9sYWJlbD4KICAgICAgICB7e2lucHV0IHR5cGU9InRleHQiCiAgICAgICAgY2xhc3M9ImZvcm0tY29udHJvbCIKICAgICAgICB2YWx1ZT1tb2RlbC5udXRhbml4Q29uZmlnLnByb2plY3QKICAgICAgICB9fQogICAgICAgIDxwIGNsYXNzPSJoZWxwLWJsb2NrIj5UaGUgbmFtZSBvZiB0aGUgcHJvamVjdCB3aGVyZSBkZXBsb3kgdGhlIFZNIChkZWZhdWx0IGlmIGVtcHR5KS9wPgogICAgICA8L2Rpdj4KICAgIDwvZGl2PgoKICAgIDxkaXYgY2xhc3M9InJvdyI+CiAgICAgIDxsYWJlbCBjbGFzcz0iYWNjLWxhYmVsIj5DbG91ZCBDb25maWcgWUFNTDwvbGFiZWw+CiAgICAgIHt7aW5wdXQteWFtbAogICAgICBzaG93RG93bmxvYWQ9ZmFsc2UKICAgICAgc2hvd1VwbG9hZD1mYWxzZQogICAgICBjYW5DaGFuZ2VOYW1lPWZhbHNlCiAgICAgIGd1dHRlcnM9KGFycmF5KQogICAgICBtaW5IZWlnaHQ9NTAwCiAgICAgIHZhbHVlPW1vZGVsLm51dGFuaXhDb25maWcuY2xvdWRJbml0CiAgICAgIH19CiAgICA8L2Rpdj4KCiAgICA8ZGl2IGNsYXNzPSJyb3ciPgogICAgICA8ZGl2IGNsYXNzPSJjb2wgc3Bhbi0xMiI+CiAgICAgICAge3tmb3JtLXZhbHVlLWFycmF5CiAgICAgICAgcmVxdWlyZWQ9dHJ1ZQogICAgICAgIGluaXRpYWxWYWx1ZXM9aW5pdE5ldHdvcmsKICAgICAgICB2YWx1ZUxhYmVsPSJjbHVzdGVyTmV3Lmdvb2dsZWdrZS5uZXR3b3JrLmxhYmVsIgogICAgICAgIGFkZEFjdGlvbkxhYmVsPSJnZW5lcmljLmFkZCIKICAgICAgICB2YWx1ZVBsYWNlaG9sZGVyPSJnZW5lcmljLm5hbWUiCiAgICAgICAgY2hhbmdlZD0oYWN0aW9uICJuZXR3b3JrQ2hhbmdlZCIpCiAgICAgICAgfX0KICAgICAgPC9kaXY+CiAgICA8L2Rpdj4KCiAgICA8ZGl2IGNsYXNzPSJyb3ciPgogICAgICA8ZGl2IGNsYXNzPSJjb2wgc3Bhbi0xMiI+CiAgICAgICAge3tmb3JtLWtleS12YWx1ZQogICAgICAgIGFsbG93TXVsdGlsaW5lVmFsdWU9ZmFsc2UKICAgICAgICBhbGxvd0VtcHR5VmFsdWU9ZmFsc2UKICAgICAgICBhZGRBY3Rpb25MYWJlbD0iZ2VuZXJpYy5hZGQiCiAgICAgICAga2V5TGFiZWw9ImdlbmVyaWMubmFtZSIKICAgICAgICBrZXlQbGFjZWhvbGRlcj0iZ2VuZXJpYy5uYW1lIgogICAgICAgIHZhbHVlUGxhY2Vob2xkZXI9InZhbHVlIgogICAgICAgIGluaXRpYWxBcnJheT1pbml0Q2F0ZWdvcnkKICAgICAgICBjaGFuZ2VkQXJyYXk9KGFjdGlvbiAiY2F0ZWdvcnlDaGFuZ2VkIikKICAgICAgICBoZWFkZXI9ICJWTSBDYXRlZ29yaWVzIgogICAgICAgIH19CiAgICAgIDwvZGl2PgogICAgPC9kaXY+CgogICAgPGRpdiBjbGFzcz0icm93Ij4KICAgICAgPGxhYmVsIGNsYXNzPSJhY2MtbGFiZWwiPnt7aW5wdXQgdHlwZT0iY2hlY2tib3giIGNoZWNrZWQ9bW9kZWwubnV0YW5peENvbmZpZy52bVNlcmlhbFBvcnR9fQogICAgICAgIEF0dGFjaCBhIHNlcmlhbCBwb3J0IHRvIHRoZSBWTQogICAgICA8L2xhYmVsPgogICAgPC9kaXY+CgogICAge3svYWNjb3JkaW9uLWxpc3QtaXRlbX19CiAgICB7ey9hY2NvcmRpb24tbGlzdH19CgogICAge3shLS0gVGhpcyBmb2xsb3dpbmcgY29udGFpbnMgdGhlIE5hbWUsIExhYmVscyBhbmQgRW5naW5lIE9wdGlvbnMgZmllbGRzIC0tfX0KICAgIDxkaXYgY2xhc3M9Im92ZXItaHIiPgogICAgICA8c3Bhbj4KICAgICAgICB7e3RlbXBsYXRlT3B0aW9uc1RpdGxlfX0KICAgICAgPC9zcGFuPgogICAgPC9kaXY+CgogICAge3tmb3JtLW5hbWUtZGVzY3JpcHRpb24KICAgIG1vZGVsPW1vZGVsCiAgICBuYW1lUmVxdWlyZWQ9dHJ1ZQogICAgcm93Q2xhc3M9InJvdyBtYi0xMCIKICAgIH19CgogICAge3tmb3JtLXVzZXItbGFiZWxzCiAgICBpbml0aWFsTGFiZWxzPWxhYmVsUmVzb3VyY2UubGFiZWxzCiAgICBzZXRMYWJlbHM9KGFjdGlvbiAnc2V0TGFiZWxzJykKICAgIGV4cGFuZD0oYWN0aW9uIGV4cGFuZEZuKQogICAgfX0KCiAgICB7e2Zvcm0tbm9kZS10YWludHMKICAgIG1vZGVsPW1vZGVsCiAgICBleHBhbmQ9KGFjdGlvbiBleHBhbmRGbikKICAgIH19CgogICAge3tmb3JtLWVuZ2luZS1vcHRzCiAgICBtYWNoaW5lPW1vZGVsCiAgICBzaG93RW5naW5lVXJsPXNob3dFbmdpbmVVcmwKICAgIH19CgogICAge3shLS0gVGhpcyBjb21wb25lbnQgc2hvd3MgZXJyb3JzIHByb2R1Y2VkIGJ5IHZhbGlkYXRlKCkgaW4gdGhlIGNvbXBvbmVudCAtLX19CiAgICB7e3RvcC1lcnJvcnMgZXJyb3JzPWVycm9yc319CgogICAge3shLS0gVGhpcyBjb21wb25lbnQgc2hvd3MgdGhlIENyZWF0ZSBhbmQgQ2FuY2VsIGJ1dHRvbnMgLS19fQogICAge3tzYXZlLWNhbmNlbCBzYXZlPSJzYXZlIiBjYW5jZWw9KGFjdGlvbiAiY2FuY2VsIil9fQogIDwvZGl2Pgo8L3NlY3Rpb24+";
  const computed = Ember.computed;
  const get = Ember.get;
  const set = Ember.set;
  const alias = Ember.computed.alias;
  const service = Ember.inject.service;
  const defaultRadix = 10;
  const defaultBase = 1024;

  const stringsToParams = (params, str) => {
    const index = str.indexOf('=');

    if (index > -1) {
      params.push({
        key: str.slice(0, index),
        value: str.slice(index + 1)
      });
    }

    return params;
  };

  const paramsToStrings = (strs, param) => {
    if (param.value && param.key) {
      strs.push(`${param.key}=${param.value}`);
    }

    return strs;
  };

  exports.default = Ember.Component.extend(_nodeDriver.default, {
    driverName: 'nutanix',
    config: alias('model.nutanixConfig'),
    app: service(),
    initCategory: null,
    initNetwork: null,

    init() {
      const decodedLayout = window.atob(LAYOUT);
      const template = Ember.HTMLBars.compile(decodedLayout, {
        moduleName: 'nodes/components/driver-nutanix/template'
      });
      set(this, 'layout', template);

      this._super(...arguments);

      this.initCategoryParams('config.vmCategories', 'initCategory');
      this.initNetworkParams('config.vmNetwork', 'initNetwork');
    },

    bootstrap: function () {
      let config = get(this, 'globalStore').createRecord({
        type: 'nutanixConfig',
        username: "admin",
        password: "",
        vmCpus: 2,
        vmCores: 1,
        vmMem: 4096,
        vmCpuPassthrough: false,
        vmImage: "",
        vmImageSize: 0,
        vmNetwork: [],
        vmCategories: [],
        project: "",
        cluster: "",
        insecure: true,
        storageContainer: "",
        diskSize: 0,
        cloudInit: "#cloud-config\n\n"
      });
      set(this, 'model.nutanixConfig', config);
    },

    validate() {
      this._super();

      var errors = get(this, 'errors') || [];

      if (!get(this, 'model.name')) {
        errors.push('Name is required');
      }

      if (!get(this, 'config.endpoint')) {
        errors.push('Management Endpoint is required');
      }

      if (!get(this, 'config.username')) {
        errors.push('Username is required');
      }

      if (!get(this, 'config.password')) {
        errors.push('Password is required');
      }

      if (!get(this, 'config.cluster')) {
        errors.push('Cluster is required');
      }

      if (parseInt(get(this, 'config.vmMem'), defaultRadix) < defaultBase) {
        errors.push('Memory Size must be at least 1024 MB');
      }

      if (!get(this, 'config.vmImage')) {
        errors.push('Template image is required');
      }

      if (get(this, 'config.vmNetwork').length === 0) {
        errors.push('Network interface is required');
      }

      if (get(this, 'config.storageContainer') && !/^[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}$/i.test(get(this, 'config.storageContainer'))) {
        errors.push('Storage Container must be a valid UUID');
      }

      if (parseInt(get(this, 'config.diskSize')) > 0 && get(this, 'config.storageContainer') === '') {
        errors.push('Storage Container is required if disk size is set');
      }

      if (get(errors, 'length')) {
        set(this, 'errors', errors);
        return false;
      } else {
        set(this, 'errors', null);
        return true;
      }
    },

    actions: {
      categoryChanged(array) {
        this.updateCategoryParams('config.vmCategories', array);
      },

      networkChanged(array) {
        this.updateNetwork('config.vmNetwork', array);
      }

    },

    initCategoryParams(pairsKey, paramsKey) {
      set(this, paramsKey, (get(this, pairsKey) || []).reduce(stringsToParams, []));
    },

    updateCategoryParams(pairsKey, params) {
      set(this, pairsKey, params.reduce(paramsToStrings, []));
    },

    initNetworkParams(pairsKey, paramsKey) {
      set(this, paramsKey, get(this, pairsKey) || []);
    },

    updateNetwork(pairsKey, networks) {
      set(this, pairsKey, networks);
    }

  });
});;
"use strict";

define("ui/components/driver-nutanix/component", ["exports", "nodes/components/driver-nutanix/component"], function (exports, _component) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function () {
      return _component.default;
    }
  });
});