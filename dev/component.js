"use strict";

define("nodes/components/driver-nutanix/component", ["exports", "shared/mixins/node-driver"], function (exports, _nodeDriver) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  const LAYOUT = "PHNlY3Rpb24gY2xhc3M9Imhvcml6b250YWwtZm9ybSI+CiAgPGRpdiBjbGFzcz0iY29udGFpbmVyLWZsdWlkIj4KCiAgICB7eyEtLSBUaGlzIGxpbmUgc2hvd3MgdGhlIGRyaXZlciB0aXRsZSB3aGljaCB5b3UgZG9uJ3QgaGF2ZSB0byBjaGFuZ2UgaXQgLS19fQogICAgPGRpdiBjbGFzcz0ib3Zlci1ociI+PHNwYW4+e3tkcml2ZXJPcHRpb25zVGl0bGV9fTwvc3Bhbj48L2Rpdj4KICAgIDxkaXYgY2xhc3M9Im92ZXItaHIiPjxzcGFuPnt7ZHJpdmVyQ29udGVudFRpdGxlfX08L3NwYW4+PC9kaXY+CgoKICAge3sjYWNjb3JkaW9uLWxpc3Qgc2hvd0V4cGFuZEFsbD1mYWxzZSBhcyB8IGFsIGV4cGFuZEZuIHwgfX0KICAgICAge3sjYWNjb3JkaW9uLWxpc3QtaXRlbSAKICAgICAgICB0aXRsZT0iMS4gQWNjb3VudCBBY2Nlc3MiCiAgICAgICAgZGV0YWlsPSJDb25maWd1cmUgdG8gY29ubmVjdCB0byB0aGUgTnV0YW5peCBQcmlzbSBDZW50cmFsIEluc3RhbmNlIgogICAgICAgIGV4cGFuZE9uSW5pdD10cnVlCiAgICAgICAgZXhwYW5kPShhY3Rpb24gZXhwYW5kRm4pCiAgICAgIH19CgogICAgPGRpdiBjbGFzcz0icm93Ij4KICAgICAgPGRpdiBjbGFzcz0iY29sIHNwYW4tMTIiPgogICAgICAgIDxsYWJlbCBjbGFzcz0iYWNjLWxhYmVsIj5NYW5hZ2VtZW50IEVuZHBvaW50PC9sYWJlbD4KICAgICAgICB7e2lucHV0IHR5cGU9InRleHQiCiAgICAgICAgICAgIGNsYXNzPSJmb3JtLWNvbnRyb2wiCiAgICAgICAgICAgIHZhbHVlPW1vZGVsLm51dGFuaXhDb25maWcuZW5kcG9pbnQKICAgICAgICB9fQogICAgICAgIDxwIGNsYXNzPSJoZWxwLWJsb2NrIj5OdXRhbml4IFByaXNtIENlbnRyYWwgYWRkcmVzczwvcD4KICAgICAgPC9kaXY+CiAgICAgIAogICAgPC9kaXY+CgogICAgPGRpdiBjbGFzcz0icm93Ij4KICAgICAgPGRpdiBjbGFzcz0iY29sIHNwYW4tNiI+CiAgICAgICAgPGxhYmVsIGNsYXNzPSJhY2MtbGFiZWwiPlVzZXJuYW1lPC9sYWJlbD4KICAgICAgICB7e2lucHV0IAogICAgICAgICAgdHlwZT0idGV4dCIKICAgICAgICAgIGNsYXNzPSJmb3JtLWNvbnRyb2wiCiAgICAgICAgICB2YWx1ZT1tb2RlbC5udXRhbml4Q29uZmlnLnVzZXJuYW1lCiAgICAgICAgfX0KICAgICAgICA8cCBjbGFzcz0iaGVscC1ibG9jayI+TnV0YW5peCBtYW5hZ2VtZW50IHVzZXJuYW1lPC9wPgogICAgICA8L2Rpdj4KICAgICAgPGRpdiBjbGFzcz0iY29sIHNwYW4tNiI+CiAgICAgICAgPGxhYmVsIGNsYXNzPSJhY2MtbGFiZWwiPlBhc3N3b3JkPC9sYWJlbD4KICAgICAgICB7e2lucHV0CiAgICAgICAgICB0eXBlPSJwYXNzd29yZCIKICAgICAgICAgIGNsYXNzPSJmb3JtLWNvbnRyb2wiCiAgICAgICAgICB2YWx1ZT1tb2RlbC5udXRhbml4Q29uZmlnLnBhc3N3b3JkCiAgICAgICAgfX0KICAgICAgICA8cCBjbGFzcz0iaGVscC1ibG9jayI+TnV0YW5peCBtYW5hZ2VtZW50IHBhc3N3b3JkPC9wPgogICAgICA8L2Rpdj4KICAgIDwvZGl2PgoKICAgIDxkaXYgY2xhc3M9ImNvbC1tZC0yIj4KICAgICAgPGRpdiBjbGFzcz0iY2hlY2tib3giPgogICAgICAgIDxsYWJlbCBjbGFzcz0iYWNjLWxhYmVsIj57e2lucHV0IHR5cGU9ImNoZWNrYm94IiBjaGVja2VkPW1vZGVsLm51dGFuaXhDb25maWcuaW5zZWN1cmV9fQogICAgICAgICAgQWxsb3cgaW5zZWN1cmUgY29tbXVuaWNhdGlvbiB0byB0aGUgZW5kcG9pbnQKICAgICAgICA8L2xhYmVsPgogICAgICA8L2Rpdj4KICAgIDwvZGl2PgoKICAgIHt7L2FjY29yZGlvbi1saXN0LWl0ZW19fQogICAge3sjYWNjb3JkaW9uLWxpc3QtaXRlbSAKICAgICAgICB0aXRsZT0iMi4gU2NoZWR1bGluZyIKICAgICAgICBkZXRhaWw9IkNob29zZSB3aGF0IGNsdXN0ZXIgdGhlIHZpcnR1YWwgbWFjaGluZSB3aWxsIGJlIHNjaGVkdWxlZCB0byIKICAgICAgICBleHBhbmRPbkluaXQ9dHJ1ZQogICAgICAgIGV4cGFuZD0oYWN0aW9uIGV4cGFuZEZuKQogICAgfX0KICAgICAgPGRpdiBjbGFzcz0icm93Ij4KICAgICAgPGRpdiBjbGFzcz0iY29sLW1kLTIgZm9ybS1sYWJlbCI+CiAgICAgICAgPGxhYmVsIGNsYXNzPSJhY2MtbGFiZWwiPkNsdXN0ZXI8L2xhYmVsPgogICAgICA8L2Rpdj4KICAgICAgPGRpdiBjbGFzcz0iY29sLW1kLTQiPgogICAgICAgIHt7aW5wdXQgdHlwZT0idGV4dCIKICAgICAgICBjbGFzcz0iZm9ybS1jb250cm9sIgogICAgICAgIHZhbHVlPW1vZGVsLm51dGFuaXhDb25maWcuY2x1c3RlcgogICAgICAgIH19CiAgICAgIDwvZGl2PgogICAgICA8ZGl2IGNsYXNzPSJjb2wtc20tMTIgY29sLW1kLTQiPgogICAgICAgIDxwIGNsYXNzPSJoZWxwLWJsb2NrIj5UaGUgbmFtZSBvZiB0aGUgY2x1c3RlciB3aGVyZSBkZXBsb3kgdmlydHVhbCBtYWNoaW5lLjwvcD4KICAgICAgPC9kaXY+CiAgICA8L2Rpdj4KCgoKICAgIHt7L2FjY29yZGlvbi1saXN0LWl0ZW19fQogICAge3sjYWNjb3JkaW9uLWxpc3QtaXRlbSAKICAgICAgICB0aXRsZT0iMy4gSW5zdGFuY2UiCiAgICAgICAgZGV0YWlsPSJDaG9vc2UgdGhlIHNpemUgYW5kIE9TIG9mIHRoZSB2aXJ0dWFsIG1hY2hpbmUiCiAgICAgICAgZXhwYW5kT25Jbml0PXRydWUKICAgICAgICBleHBhbmQ9KGFjdGlvbiBleHBhbmRGbikKICAgIH19CgogICAgPGRpdiBjbGFzcz0icm93Ij4KICAgICAgPGRpdiBjbGFzcz0iY29sIHNwYW4tNiI+CiAgICAgICAgIDxsYWJlbCBjbGFzcz0iYWNjLWxhYmVsIj5DUFVzPC9sYWJlbD4KICAgICAgICAgPGRpdiBjbGFzcz0iaW5wdXQtZ3JvdXAiPgogICAgICAgICAgIHt7aW5wdXQtaW50ZWdlcgogICAgICAgICAgICBtaW49MQogICAgICAgICAgICBtYXg9MzIKICAgICAgICAgICAgdmFsdWU9bW9kZWwubnV0YW5peENvbmZpZy52bUNwdXMKICAgICAgICAgICAgY2xhc3NOYW1lcz0iZm9ybS1jb250cm9sIgogICAgICAgICAgIH19CiAgICAgICAgICAgPGRpdiBjbGFzcz0iaW5wdXQtZ3JvdXAtYWRkb24gYmctZGVmYXVsdCI+CiAgICAgICAgICAgICB7e3QgIm5vZGVEcml2ZXIuaGFydmVzdGVyLmNwdUNvdW50LnVuaXQiIGNvcmVzPWNvbmZpZy52bUNwdXN9fQogICAgICAgICAgIDwvZGl2PgogICAgICAgICA8L2Rpdj4KICAgICAgICAgPGxhYmVsIGNsYXNzPSJhY2MtbGFiZWwiPnt7aW5wdXQgdHlwZT0iY2hlY2tib3giIGNoZWNrZWQ9bW9kZWwubnV0YW5peENvbmZpZy52bUNwdVBhc3N0aHJvdWdofX0KICAgICAgICAgICBQYXNzdGhyb3VnaCB0aGUgaG9zdCdzIENQVSBmZWF0dXJlcyB0byB0aGUgVk0KICAgICAgICA8L2xhYmVsPgogICAgICA8L2Rpdj4KICAgICAgPGRpdiBjbGFzcz0iY29sIHNwYW4tNiI+CiAgICAgICAgPGxhYmVsIGNsYXNzPSJhY2MtbGFiZWwiPk1lbW9yeTwvbGFiZWw+CiAgICAgICAgPGRpdiBjbGFzcz0iaW5wdXQtZ3JvdXAiPgogICAgICAgICAge3tpbnB1dC1pbnRlZ2VyCiAgICAgICAgICAgIG1pbj0xCiAgICAgICAgICAgIHZhbHVlPW1vZGVsLm51dGFuaXhDb25maWcudm1NZW0KICAgICAgICAgICAgY2xhc3NOYW1lcz0iZm9ybS1jb250cm9sIgogICAgICAgICAgfX0KICAgICAgICAgIDxkaXYgY2xhc3M9ImlucHV0LWdyb3VwLWFkZG9uIGJnLWRlZmF1bHQiPk1CPC9kaXY+CiAgICAgICAgPC9kaXY+CiAgICAgIDwvZGl2PgogICAgPC9kaXY+CgogICAgPGRpdiBjbGFzcz0icm93Ij4KICAgICAgPGRpdiBjbGFzcz0iY29sIHNwYW4tNiI+CiAgICAgICAgPGxhYmVsIGNsYXNzPSJhY2MtbGFiZWwiPlRlbXBsYXRlIEltYWdlPC9sYWJlbD4KICAgICAgICAgIHt7aW5wdXQgdHlwZT0idGV4dCIKICAgICAgICAgICAgY2xhc3M9ImZvcm0tY29udHJvbCIKICAgICAgICAgICAgdmFsdWU9bW9kZWwubnV0YW5peENvbmZpZy52bUltYWdlCiAgICAgICAgICB9fQogICAgICAgIDxwIGNsYXNzPSJoZWxwLWJsb2NrIj5UaGUgbmFtZSBvZiB0aGUgZGlzayBpbWFnZSB0byB1c2UgYXMgdGVtcGxhdGUgZm9yIHRoZSBWTTwvcD4KICAgICAgPC9kaXY+CiAgICAgIDxkaXYgY2xhc3M9ImNvbCBzcGFuLTYiPgogICAgICAgIDxsYWJlbCBjbGFzcz0iYWNjLWxhYmVsIj5WTSBEaXNrIFNpemU8L2xhYmVsPgogICAgICAgIDxkaXYgY2xhc3M9ImlucHV0LWdyb3VwIj4KICAgICAgICAgIHt7aW5wdXQtaW50ZWdlcgogICAgICAgICAgICBtaW49MAogICAgICAgICAgICB2YWx1ZT1tb2RlbC5udXRhbml4Q29uZmlnLnZtSW1hZ2VTaXplCiAgICAgICAgICAgIGNsYXNzTmFtZXM9ImZvcm0tY29udHJvbCIKICAgICAgICAgIH19CiAgICAgICAgICA8ZGl2IGNsYXNzPSJpbnB1dC1ncm91cC1hZGRvbiBiZy1kZWZhdWx0Ij5HaUI8L2Rpdj4KICAgICAgICA8L2Rpdj4KICAgICAgICA8cCBjbGFzcz0iaGVscC1ibG9jayI+U2l6ZSB0byBleHRhbmQgdGhlIHRlbXBsYXRlIGRpc2suIFNldCB0aGlzIHRvIHplcm8gaWYgeW91IGRvbid0IHdhbnQgdG8gZXh0ZW5kIHRoZSB0ZW1wbGF0ZSBkaXNrLjwvcD4KICAgICAgPC9kaXY+CiAgICA8L2Rpdj4KCiAgICA8ZGl2IGNsYXNzPSJyb3ciPgogICAgICA8ZGl2IGNsYXNzPSJjb2wgc3Bhbi02Ij4KICAgICAgICA8bGFiZWwgY2xhc3M9ImFjYy1sYWJlbCI+QWRkaXRpb25hbCBEaXNrIFNpemU8L2xhYmVsPgogICAgICAgIDxkaXYgY2xhc3M9ImlucHV0LWdyb3VwIj4KICAgICAgICAgIHt7aW5wdXQtaW50ZWdlcgogICAgICAgICAgICBtaW49MAogICAgICAgICAgICB2YWx1ZT1tb2RlbC5udXRhbml4Q29uZmlnLmRpc2tTaXplCiAgICAgICAgICAgIGNsYXNzTmFtZXM9ImZvcm0tY29udHJvbCIKICAgICAgICAgIH19CiAgICAgICAgICA8ZGl2IGNsYXNzPSJpbnB1dC1ncm91cC1hZGRvbiBiZy1kZWZhdWx0Ij5HaUI8L2Rpdj4KICAgICAgICA8L2Rpdj4KICAgICAgICA8cCBjbGFzcz0iaGVscC1ibG9jayI+U2l6ZSBvZiB0aGUgYWRkaXRpb25hbCBkaXNrIHRvIGJlIHByb3Zpc2lvbmVkLiBMZWF2ZSB0byB6ZXJvIGlmIHlvdSBkb24ndCB3YW50IHRvIHByb3Zpc2lvbiBhbiBleHRyYSBkaXNrLjwvcD4KICAgICAgPC9kaXY+CiAgICAgIDxkaXYgY2xhc3M9ImNvbCBzcGFuLTYiPgogICAgICAgIDxsYWJlbCBjbGFzcz0iYWNjLWxhYmVsIj5TdG9yYWdlIENvbnRhaW5lcjwvbGFiZWw+CiAgICAgICAgICB7e2lucHV0IHR5cGU9InRleHQiCiAgICAgICAgICAgIGNsYXNzPSJmb3JtLWNvbnRyb2wiCiAgICAgICAgICAgIHZhbHVlPW1vZGVsLm51dGFuaXhDb25maWcuc3RvcmFnZUNvbnRhaW5lcgogICAgICAgICAgfX0KICAgICAgICA8cCBjbGFzcz0iaGVscC1ibG9jayI+VVVJRCBvZiB0aGUgc3RvcmFnZSBjb250YWluZXIgdG8gYmUgdXNlZCBmb3IgdGhlIGFkZGl0aW9uYWwgZGlzay4gTGVhdmUgZW1wdHkgaWYgeW91IGRvbid0IHdhbnQgdG8gcHJvdmlzaW9uIGFuIGV4dHJhIGRpc2suPC9wPgogICAgICA8L2Rpdj4KICAgIDwvZGl2PgoKICAgIDxkaXYgY2xhc3M9InJvdyI+CiAgICAgIDxsYWJlbCBjbGFzcz0iYWNjLWxhYmVsIj5DbG91ZCBDb25maWcgWUFNTDwvbGFiZWw+CiAgICAgICAge3tpbnB1dC15YW1sCiAgICAgICAgc2hvd0Rvd25sb2FkPWZhbHNlCiAgICAgICAgc2hvd1VwbG9hZD1mYWxzZQogICAgICAgIGNhbkNoYW5nZU5hbWU9ZmFsc2UKICAgICAgICBndXR0ZXJzPShhcnJheSkKICAgICAgICBtaW5IZWlnaHQ9NTAwCiAgICAgICAgdmFsdWU9bW9kZWwubnV0YW5peENvbmZpZy5jbG91ZEluaXQKICAgICAgfX0KICAgIDwvZGl2PgoKICAgIDxkaXYgY2xhc3M9InJvdyI+CiAgICAgIDxkaXYgY2xhc3M9ImNvbCBzcGFuLTEyIj4KICAgICAgICB7e2Zvcm0tdmFsdWUtYXJyYXkKICAgICAgICAgIHJlcXVpcmVkPXRydWUKICAgICAgICAgIGluaXRpYWxWYWx1ZXM9aW5pdE5ldHdvcmsKICAgICAgICAgIHZhbHVlTGFiZWw9ImNsdXN0ZXJOZXcuZ29vZ2xlZ2tlLm5ldHdvcmsubGFiZWwiCiAgICAgICAgICBhZGRBY3Rpb25MYWJlbD0iZ2VuZXJpYy5hZGQiCiAgICAgICAgICB2YWx1ZVBsYWNlaG9sZGVyPSJnZW5lcmljLm5hbWUiCiAgICAgICAgICBjaGFuZ2VkPShhY3Rpb24gIm5ldHdvcmtDaGFuZ2VkIikKICAgICAgICB9fQogICAgICA8L2Rpdj4KICAgIDwvZGl2PgoKICAgIDxkaXYgY2xhc3M9InJvdyI+CiAgICAgIDxkaXYgY2xhc3M9ImNvbCBzcGFuLTEyIj4KICAgICAgICB7e2Zvcm0ta2V5LXZhbHVlCiAgICAgICAgICBhbGxvd011bHRpbGluZVZhbHVlPWZhbHNlCiAgICAgICAgICBhbGxvd0VtcHR5VmFsdWU9ZmFsc2UKICAgICAgICAgIGFkZEFjdGlvbkxhYmVsPSJnZW5lcmljLmFkZCIKICAgICAgICAgIGtleUxhYmVsPSJnZW5lcmljLm5hbWUiCiAgICAgICAgICBrZXlQbGFjZWhvbGRlcj0iZ2VuZXJpYy5uYW1lIgogICAgICAgICAgdmFsdWVQbGFjZWhvbGRlcj0idmFsdWUiCiAgICAgICAgICBpbml0aWFsQXJyYXk9aW5pdENhdGVnb3J5CiAgICAgICAgICBjaGFuZ2VkQXJyYXk9KGFjdGlvbiAiY2F0ZWdvcnlDaGFuZ2VkIikKICAgICAgICAgIGhlYWRlcj0gIlZNIENhdGVnb3JpZXMiCiAgICAgICAgfX0KICAgICAgPC9kaXY+CiAgICA8L2Rpdj4KCiAgICA8ZGl2IGNsYXNzPSJyb3ciPgogICAgICA8bGFiZWwgY2xhc3M9ImFjYy1sYWJlbCI+e3tpbnB1dCB0eXBlPSJjaGVja2JveCIgY2hlY2tlZD1tb2RlbC5udXRhbml4Q29uZmlnLnZtU2VyaWFsUG9ydH19CiAgICAgICAgQXR0YWNoIGEgc2VyaWFsIHBvcnQgdG8gdGhlIFZNCiAgICAgIDwvbGFiZWw+CiAgICA8L2Rpdj4KCiAgICB7ey9hY2NvcmRpb24tbGlzdC1pdGVtfX0KICB7ey9hY2NvcmRpb24tbGlzdH19CgogICAge3shLS0gVGhpcyBmb2xsb3dpbmcgY29udGFpbnMgdGhlIE5hbWUsIExhYmVscyBhbmQgRW5naW5lIE9wdGlvbnMgZmllbGRzIC0tfX0KICAgIDxkaXYgY2xhc3M9Im92ZXItaHIiPgogICAgICA8c3Bhbj4KICAgICAgICB7e3RlbXBsYXRlT3B0aW9uc1RpdGxlfX0KICAgICAgPC9zcGFuPgogICAgPC9kaXY+CgogICAge3tmb3JtLW5hbWUtZGVzY3JpcHRpb24KICAgICAgbW9kZWw9bW9kZWwKICAgICAgbmFtZVJlcXVpcmVkPXRydWUKICAgICAgcm93Q2xhc3M9InJvdyBtYi0xMCIKICAgIH19CgogICAge3tmb3JtLXVzZXItbGFiZWxzCiAgICAgIGluaXRpYWxMYWJlbHM9bGFiZWxSZXNvdXJjZS5sYWJlbHMKICAgICAgc2V0TGFiZWxzPShhY3Rpb24gJ3NldExhYmVscycpCiAgICAgIGV4cGFuZD0oYWN0aW9uIGV4cGFuZEZuKQogICAgfX0KCiAgICB7e2Zvcm0tbm9kZS10YWludHMKICAgIG1vZGVsPW1vZGVsCiAgICBleHBhbmQ9KGFjdGlvbiBleHBhbmRGbikKICAgIH19CgogICAge3tmb3JtLWVuZ2luZS1vcHRzCiAgICAgIG1hY2hpbmU9bW9kZWwKICAgICAgc2hvd0VuZ2luZVVybD1zaG93RW5naW5lVXJsCiAgICB9fQoKICAgIHt7IS0tIFRoaXMgY29tcG9uZW50IHNob3dzIGVycm9ycyBwcm9kdWNlZCBieSB2YWxpZGF0ZSgpIGluIHRoZSBjb21wb25lbnQgLS19fQogICAge3t0b3AtZXJyb3JzIGVycm9ycz1lcnJvcnN9fQoKICAgIHt7IS0tIFRoaXMgY29tcG9uZW50IHNob3dzIHRoZSBDcmVhdGUgYW5kIENhbmNlbCBidXR0b25zIC0tfX0KICAgIHt7c2F2ZS1jYW5jZWwgc2F2ZT0ic2F2ZSIgY2FuY2VsPShhY3Rpb24gImNhbmNlbCIpfX0KICA8L2Rpdj4KPC9zZWN0aW9uPg==";
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
        vmCpus: 2,
        vmCores: 1,
        vmMem: 4096,
        vmCpuPassthrough: false,
        vmImage: "",
        vmImageSize: 0,
        vmNetwork: [],
        vmCategories: [],
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

      if (!get(this, 'config.vmNetwork')) {
        errors.push('Network interface is required');
      }

      if (get(this, 'config.storageContainer') && !/^[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}$/i.test(get(this, 'config.storageContainer'))) {
        errors.push('Storage Container must be a valid UUID');
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