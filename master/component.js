"use strict";

define("nodes/components/driver-nutanix/component", ["exports", "shared/mixins/node-driver"], function (exports, _nodeDriver) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  const LAYOUT = "PHNlY3Rpb24gY2xhc3M9Imhvcml6b250YWwtZm9ybSI+CiAgPGRpdiBjbGFzcz0iY29udGFpbmVyLWZsdWlkIj4KCiAgICB7eyEtLSBUaGlzIGxpbmUgc2hvd3MgdGhlIGRyaXZlciB0aXRsZSB3aGljaCB5b3UgZG9uJ3QgaGF2ZSB0byBjaGFuZ2UgaXQgLS19fQogICAgPGRpdiBjbGFzcz0ib3Zlci1ociI+PHNwYW4+e3tkcml2ZXJPcHRpb25zVGl0bGV9fTwvc3Bhbj48L2Rpdj4KCgogICAge3sjYWNjb3JkaW9uLWxpc3Qgc2hvd0V4cGFuZEFsbD1mYWxzZSBhcyB8IGFsIGV4cGFuZEZuIHwgfX0KICAgIHt7I2FjY29yZGlvbi1saXN0LWl0ZW0KICAgIHRpdGxlPSIxLiBBY2NvdW50IEFjY2VzcyIKICAgIGRldGFpbD0iQ29uZmlndXJlIHRvIGNvbm5lY3QgdG8gdGhlIE51dGFuaXggUHJpc20gQ2VudHJhbCBJbnN0YW5jZSIKICAgIGV4cGFuZE9uSW5pdD10cnVlCiAgICBleHBhbmQ9KGFjdGlvbiBleHBhbmRGbikKICAgIH19CgogICAgPGRpdiBjbGFzcz0icm93Ij4KICAgICAgPGRpdiBjbGFzcz0iY29sIHNwYW4tMTIiPgogICAgICAgIDxsYWJlbCBjbGFzcz0iYWNjLWxhYmVsIj5NYW5hZ2VtZW50IEVuZHBvaW50CiAgICAgICAgICA8c3BhbiBjbGFzcz0iZmllbGQtcmVxdWlyZWQgZW1iZXItdmlldyI+Kjwvc3Bhbj4KICAgICAgICA8L2xhYmVsPgogICAgICAgIHt7aW5wdXQgdHlwZT0idGV4dCIKICAgICAgICBjbGFzcz0iZm9ybS1jb250cm9sIgogICAgICAgIHZhbHVlPW1vZGVsLm51dGFuaXhDb25maWcuZW5kcG9pbnQKICAgICAgICB9fQogICAgICAgIDxwIGNsYXNzPSJoZWxwLWJsb2NrIj5OdXRhbml4IFByaXNtIENlbnRyYWwgYWRkcmVzczwvcD4KICAgICAgPC9kaXY+CgogICAgPC9kaXY+CgogICAgPGRpdiBjbGFzcz0icm93Ij4KICAgICAgPGRpdiBjbGFzcz0iY29sIHNwYW4tNiI+CiAgICAgICAgPGxhYmVsIGNsYXNzPSJhY2MtbGFiZWwiPlVzZXJuYW1lCiAgICAgICAgICA8c3BhbiBjbGFzcz0iZmllbGQtcmVxdWlyZWQgZW1iZXItdmlldyI+Kjwvc3Bhbj4KICAgICAgICA8L2xhYmVsPgogICAgICAgIHt7aW5wdXQKICAgICAgICB0eXBlPSJ0ZXh0IgogICAgICAgIGNsYXNzPSJmb3JtLWNvbnRyb2wiCiAgICAgICAgdmFsdWU9bW9kZWwubnV0YW5peENvbmZpZy51c2VybmFtZQogICAgICAgIH19CiAgICAgICAgPHAgY2xhc3M9ImhlbHAtYmxvY2siPk51dGFuaXggbWFuYWdlbWVudCB1c2VybmFtZTwvcD4KICAgICAgPC9kaXY+CiAgICAgIDxkaXYgY2xhc3M9ImNvbCBzcGFuLTYiPgogICAgICAgIDxsYWJlbCBjbGFzcz0iYWNjLWxhYmVsIj5QYXNzd29yZAogICAgICAgICAgPHNwYW4gY2xhc3M9ImZpZWxkLXJlcXVpcmVkIGVtYmVyLXZpZXciPio8L3NwYW4+CiAgICAgICAgPC9sYWJlbD4KICAgICAgICB7e2lucHV0CiAgICAgICAgdHlwZT0icGFzc3dvcmQiCiAgICAgICAgY2xhc3M9ImZvcm0tY29udHJvbCIKICAgICAgICB2YWx1ZT1tb2RlbC5udXRhbml4Q29uZmlnLnBhc3N3b3JkCiAgICAgICAgfX0KICAgICAgICA8cCBjbGFzcz0iaGVscC1ibG9jayI+TnV0YW5peCBtYW5hZ2VtZW50IHBhc3N3b3JkPC9wPgogICAgICA8L2Rpdj4KICAgIDwvZGl2PgoKICAgIDxkaXYgY2xhc3M9ImNvbC1tZC0yIj4KICAgICAgPGRpdiBjbGFzcz0iY2hlY2tib3giPgogICAgICAgIDxsYWJlbCBjbGFzcz0iYWNjLWxhYmVsIj57e2lucHV0IHR5cGU9ImNoZWNrYm94IiBjaGVja2VkPW1vZGVsLm51dGFuaXhDb25maWcuaW5zZWN1cmV9fQogICAgICAgICAgQWxsb3cgaW5zZWN1cmUgY29tbXVuaWNhdGlvbiB0byB0aGUgZW5kcG9pbnQKICAgICAgICA8L2xhYmVsPgogICAgICA8L2Rpdj4KICAgIDwvZGl2PgoKICAgIHt7L2FjY29yZGlvbi1saXN0LWl0ZW19fQogICAge3sjYWNjb3JkaW9uLWxpc3QtaXRlbQogICAgdGl0bGU9IjIuIFNjaGVkdWxpbmciCiAgICBkZXRhaWw9IkNob29zZSB3aGF0IGNsdXN0ZXIgdGhlIHZpcnR1YWwgbWFjaGluZSB3aWxsIGJlIHNjaGVkdWxlZCB0byIKICAgIGV4cGFuZE9uSW5pdD10cnVlCiAgICBleHBhbmQ9KGFjdGlvbiBleHBhbmRGbikKICAgIH19CiAgICA8ZGl2IGNsYXNzPSJyb3ciPgogICAgICA8ZGl2IGNsYXNzPSJjb2wtbWQtMiBmb3JtLWxhYmVsIj4KICAgICAgICA8bGFiZWwgY2xhc3M9ImFjYy1sYWJlbCI+Q2x1c3RlcgogICAgICAgICAgPHNwYW4gY2xhc3M9ImZpZWxkLXJlcXVpcmVkIGVtYmVyLXZpZXciPio8L3NwYW4+CiAgICAgICAgPC9sYWJlbD4KICAgICAgPC9kaXY+CiAgICAgIDxkaXYgY2xhc3M9ImNvbC1tZC00Ij4KICAgICAgICB7e2lucHV0IHR5cGU9InRleHQiCiAgICAgICAgY2xhc3M9ImZvcm0tY29udHJvbCIKICAgICAgICB2YWx1ZT1tb2RlbC5udXRhbml4Q29uZmlnLmNsdXN0ZXIKICAgICAgICB9fQogICAgICA8L2Rpdj4KICAgICAgPGRpdiBjbGFzcz0iY29sLXNtLTEyIGNvbC1tZC00Ij4KICAgICAgICA8cCBjbGFzcz0iaGVscC1ibG9jayI+VGhlIG5hbWUgb2YgdGhlIGNsdXN0ZXIgd2hlcmUgZGVwbG95IHZpcnR1YWwgbWFjaGluZS48L3A+CiAgICAgIDwvZGl2PgogICAgPC9kaXY+CgoKCiAgICB7ey9hY2NvcmRpb24tbGlzdC1pdGVtfX0KICAgIHt7I2FjY29yZGlvbi1saXN0LWl0ZW0KICAgIHRpdGxlPSIzLiBJbnN0YW5jZSIKICAgIGRldGFpbD0iQ2hvb3NlIHRoZSBzaXplIGFuZCBPUyBvZiB0aGUgdmlydHVhbCBtYWNoaW5lIgogICAgZXhwYW5kT25Jbml0PXRydWUKICAgIGV4cGFuZD0oYWN0aW9uIGV4cGFuZEZuKQogICAgfX0KCiAgICA8ZGl2IGNsYXNzPSJyb3ciPgogICAgICA8ZGl2IGNsYXNzPSJjb2wgc3Bhbi02Ij4KICAgICAgICA8bGFiZWwgY2xhc3M9ImFjYy1sYWJlbCI+Q1BVczwvbGFiZWw+CiAgICAgICAgPGRpdiBjbGFzcz0iaW5wdXQtZ3JvdXAiPgogICAgICAgICAge3tpbnB1dC1pbnRlZ2VyCiAgICAgICAgICBtaW49MQogICAgICAgICAgbWF4PTMyCiAgICAgICAgICB2YWx1ZT1tb2RlbC5udXRhbml4Q29uZmlnLnZtQ3B1cwogICAgICAgICAgY2xhc3NOYW1lcz0iZm9ybS1jb250cm9sIgogICAgICAgICAgfX0KICAgICAgICAgIDxkaXYgY2xhc3M9ImlucHV0LWdyb3VwLWFkZG9uIGJnLWRlZmF1bHQiPgogICAgICAgICAgICB7e3QgIm5vZGVEcml2ZXIuaGFydmVzdGVyLmNwdUNvdW50LnVuaXQiIGNvcmVzPWNvbmZpZy52bUNwdXN9fQogICAgICAgICAgPC9kaXY+CiAgICAgICAgPC9kaXY+CiAgICAgICAgPGxhYmVsIGNsYXNzPSJhY2MtbGFiZWwiPnt7aW5wdXQgdHlwZT0iY2hlY2tib3giIGNoZWNrZWQ9bW9kZWwubnV0YW5peENvbmZpZy52bUNwdVBhc3N0aHJvdWdofX0KICAgICAgICAgIFBhc3N0aHJvdWdoIHRoZSBob3N0J3MgQ1BVIGZlYXR1cmVzIHRvIHRoZSBWTQogICAgICAgIDwvbGFiZWw+CiAgICAgIDwvZGl2PgogICAgICA8ZGl2IGNsYXNzPSJjb2wgc3Bhbi02Ij4KICAgICAgICA8bGFiZWwgY2xhc3M9ImFjYy1sYWJlbCI+TWVtb3J5PC9sYWJlbD4KICAgICAgICA8ZGl2IGNsYXNzPSJpbnB1dC1ncm91cCI+CiAgICAgICAgICB7e2lucHV0LWludGVnZXIKICAgICAgICAgIG1pbj0xCiAgICAgICAgICB2YWx1ZT1tb2RlbC5udXRhbml4Q29uZmlnLnZtTWVtCiAgICAgICAgICBjbGFzc05hbWVzPSJmb3JtLWNvbnRyb2wiCiAgICAgICAgICB9fQogICAgICAgICAgPGRpdiBjbGFzcz0iaW5wdXQtZ3JvdXAtYWRkb24gYmctZGVmYXVsdCI+TUI8L2Rpdj4KICAgICAgICA8L2Rpdj4KICAgICAgPC9kaXY+CiAgICA8L2Rpdj4KCiAgICA8ZGl2IGNsYXNzPSJyb3ciPgogICAgICA8ZGl2IGNsYXNzPSJjb2wgc3Bhbi02Ij4KICAgICAgICA8bGFiZWwgY2xhc3M9ImFjYy1sYWJlbCI+CiAgICAgICAgICBUZW1wbGF0ZSBJbWFnZXt7ZmllbGQtcmVxdWlyZWR9fQogICAgICAgIDwvbGFiZWw+CiAgICAgICAge3tpbnB1dCB0eXBlPSJ0ZXh0IgogICAgICAgIGNsYXNzPSJmb3JtLWNvbnRyb2wiCiAgICAgICAgdmFsdWU9bW9kZWwubnV0YW5peENvbmZpZy52bUltYWdlCiAgICAgICAgfX0KICAgICAgICA8cCBjbGFzcz0iaGVscC1ibG9jayI+VGhlIG5hbWUgb2YgdGhlIGRpc2sgaW1hZ2UgdG8gdXNlIGFzIHRlbXBsYXRlIGZvciB0aGUgVk08L3A+CiAgICAgIDwvZGl2PgogICAgICA8ZGl2IGNsYXNzPSJjb2wgc3Bhbi02Ij4KICAgICAgICA8bGFiZWwgY2xhc3M9ImFjYy1sYWJlbCI+Vk0gRGlzayBTaXplPC9sYWJlbD4KICAgICAgICA8ZGl2IGNsYXNzPSJpbnB1dC1ncm91cCI+CiAgICAgICAgICB7e2lucHV0LWludGVnZXIKICAgICAgICAgIG1pbj0wCiAgICAgICAgICB2YWx1ZT1tb2RlbC5udXRhbml4Q29uZmlnLnZtSW1hZ2VTaXplCiAgICAgICAgICBjbGFzc05hbWVzPSJmb3JtLWNvbnRyb2wiCiAgICAgICAgICB9fQogICAgICAgICAgPGRpdiBjbGFzcz0iaW5wdXQtZ3JvdXAtYWRkb24gYmctZGVmYXVsdCI+R2lCPC9kaXY+CiAgICAgICAgPC9kaXY+CiAgICAgICAgPHAgY2xhc3M9ImhlbHAtYmxvY2siPlNpemUgdG8gZXh0ZW5kIHRoZSB0ZW1wbGF0ZSBkaXNrLiBTZXQgdGhpcyB0byB6ZXJvIGlmIHlvdSBkb24ndCB3YW50IHRvIGV4dGVuZAogICAgICAgICAgaXQuPGJyPlJlY29tbWVuZGVkIGlmIHlvdXIgaW1hZ2UgaXMgc21hbGxlciB0aGFuIDQwR0I8L3A+CiAgICAgIDwvZGl2PgogICAgPC9kaXY+CgogICAgPGRpdiBjbGFzcz0icm93Ij4KICAgICAgPGRpdiBjbGFzcz0iY29sIHNwYW4tNiI+CiAgICAgICAgPGxhYmVsIGNsYXNzPSJhY2MtbGFiZWwiPkFkZGl0aW9uYWwgRGlzayBTaXplPC9sYWJlbD4KICAgICAgICA8ZGl2IGNsYXNzPSJpbnB1dC1ncm91cCI+CiAgICAgICAgICB7e2lucHV0LWludGVnZXIKICAgICAgICAgIG1pbj0wCiAgICAgICAgICB2YWx1ZT1tb2RlbC5udXRhbml4Q29uZmlnLmRpc2tTaXplCiAgICAgICAgICBjbGFzc05hbWVzPSJmb3JtLWNvbnRyb2wiCiAgICAgICAgICB9fQogICAgICAgICAgPGRpdiBjbGFzcz0iaW5wdXQtZ3JvdXAtYWRkb24gYmctZGVmYXVsdCI+R2lCPC9kaXY+CiAgICAgICAgPC9kaXY+CiAgICAgICAgPHAgY2xhc3M9ImhlbHAtYmxvY2siPlNpemUgb2YgdGhlIGFkZGl0aW9uYWwgZGlzayB0byBiZSBwcm92aXNpb25lZC4gTGVhdmUgdG8gemVybyBpZiB5b3UgZG9uJ3Qgd2FudCB0bwogICAgICAgICAgcHJvdmlzaW9uIGFuIGV4dHJhIGRpc2suPC9wPgogICAgICA8L2Rpdj4KICAgICAgPGRpdiBjbGFzcz0iY29sIHNwYW4tNiI+CiAgICAgICAgPGxhYmVsIGNsYXNzPSJhY2MtbGFiZWwiPlN0b3JhZ2UgQ29udGFpbmVyPC9sYWJlbD4KICAgICAgICB7e2lucHV0IHR5cGU9InRleHQiCiAgICAgICAgY2xhc3M9ImZvcm0tY29udHJvbCIKICAgICAgICB2YWx1ZT1tb2RlbC5udXRhbml4Q29uZmlnLnN0b3JhZ2VDb250YWluZXIKICAgICAgICB9fQogICAgICAgIDxwIGNsYXNzPSJoZWxwLWJsb2NrIj5VVUlEIG9mIHRoZSBzdG9yYWdlIGNvbnRhaW5lciB0byBiZSB1c2VkIGZvciB0aGUgYWRkaXRpb25hbCBkaXNrLiBMZWF2ZSBlbXB0eSBpZiB5b3UgZG9uJ3QKICAgICAgICAgIHdhbnQgdG8gcHJvdmlzaW9uIGFuIGV4dHJhIGRpc2suPC9wPgogICAgICA8L2Rpdj4KICAgIDwvZGl2PgoKICAgIDxkaXYgY2xhc3M9InJvdyI+CiAgICAgIDxkaXYgY2xhc3M9ImNvbCBzcGFuLTYiPgogICAgICAgIDxsYWJlbCBjbGFzcz0iYWNjLWxhYmVsIj5Qcm9qZWN0IE5hbWU8L2xhYmVsPgogICAgICAgIHt7aW5wdXQgdHlwZT0idGV4dCIKICAgICAgICBjbGFzcz0iZm9ybS1jb250cm9sIgogICAgICAgIHZhbHVlPW1vZGVsLm51dGFuaXhDb25maWcucHJvamVjdAogICAgICAgIH19CiAgICAgICAgPHAgY2xhc3M9ImhlbHAtYmxvY2siPlRoZSBuYW1lIG9mIHRoZSBwcm9qZWN0IHdoZXJlIGRlcGxveSB0aGUgVk0gKGRlZmF1bHQgaWYgZW1wdHkpPC9wPgogICAgICA8L2Rpdj4KICAgIDwvZGl2PgoKICAgIDxkaXYgY2xhc3M9InJvdyI+CiAgICAgIDxkaXYgY2xhc3M9ImNvbCBzcGFuLTYiPgogICAgICAgIDxsYWJlbCBjbGFzcz0iYWNjLWxhYmVsIj5Cb290IENvbmZpZ3VyYXRpb246IDwvbGFiZWw+CiAgICAgICAgPGRpdiBjbGFzcz0icmFkaW8iPgogICAgICAgICAge3tyYWRpby1idXR0b24gc2VsZWN0aW9uPW1vZGVsLm51dGFuaXhDb25maWcuYm9vdFR5cGUgdmFsdWU9ImxlZ2FjeSJ9fQogICAgICAgICAgTGVnYWN5CiAgICAgICAgICB7e3JhZGlvLWJ1dHRvbiBzZWxlY3Rpb249bW9kZWwubnV0YW5peENvbmZpZy5ib290VHlwZSB2YWx1ZT0idWVmaSJ9fQogICAgICAgICAgVUVGSQogICAgICAgIDwvZGl2PgogICAgICA8L2Rpdj4KICAgIDwvZGl2PgoKICAgIDxkaXYgY2xhc3M9InJvdyI+CiAgICAgIDxsYWJlbCBjbGFzcz0iYWNjLWxhYmVsIj5DbG91ZCBDb25maWcgWUFNTDwvbGFiZWw+CiAgICAgIHt7aW5wdXQteWFtbAogICAgICBzaG93RG93bmxvYWQ9ZmFsc2UKICAgICAgc2hvd1VwbG9hZD1mYWxzZQogICAgICBjYW5DaGFuZ2VOYW1lPWZhbHNlCiAgICAgIGd1dHRlcnM9KGFycmF5KQogICAgICBtaW5IZWlnaHQ9NTAwCiAgICAgIHZhbHVlPW1vZGVsLm51dGFuaXhDb25maWcuY2xvdWRJbml0CiAgICAgIH19CiAgICA8L2Rpdj4KCiAgICA8ZGl2IGNsYXNzPSJyb3ciPgogICAgICA8ZGl2IGNsYXNzPSJjb2wgc3Bhbi0xMiI+CiAgICAgICAge3tmb3JtLXZhbHVlLWFycmF5CiAgICAgICAgcmVxdWlyZWQ9dHJ1ZQogICAgICAgIGluaXRpYWxWYWx1ZXM9aW5pdE5ldHdvcmsKICAgICAgICB2YWx1ZUxhYmVsPSJjbHVzdGVyTmV3Lmdvb2dsZWdrZS5uZXR3b3JrLmxhYmVsIgogICAgICAgIGFkZEFjdGlvbkxhYmVsPSJnZW5lcmljLmFkZCIKICAgICAgICB2YWx1ZVBsYWNlaG9sZGVyPSJnZW5lcmljLm5hbWUiCiAgICAgICAgY2hhbmdlZD0oYWN0aW9uICJuZXR3b3JrQ2hhbmdlZCIpCiAgICAgICAgfX0KICAgICAgPC9kaXY+CiAgICA8L2Rpdj4KCiAgICA8ZGl2IGNsYXNzPSJyb3ciPgogICAgICA8ZGl2IGNsYXNzPSJjb2wgc3Bhbi0xMiI+CiAgICAgICAge3tmb3JtLWtleS12YWx1ZQogICAgICAgIGFsbG93TXVsdGlsaW5lVmFsdWU9ZmFsc2UKICAgICAgICBhbGxvd0VtcHR5VmFsdWU9ZmFsc2UKICAgICAgICBhZGRBY3Rpb25MYWJlbD0iZ2VuZXJpYy5hZGQiCiAgICAgICAga2V5TGFiZWw9ImdlbmVyaWMubmFtZSIKICAgICAgICBrZXlQbGFjZWhvbGRlcj0iZ2VuZXJpYy5uYW1lIgogICAgICAgIHZhbHVlUGxhY2Vob2xkZXI9InZhbHVlIgogICAgICAgIGluaXRpYWxBcnJheT1pbml0Q2F0ZWdvcnkKICAgICAgICBjaGFuZ2VkQXJyYXk9KGFjdGlvbiAiY2F0ZWdvcnlDaGFuZ2VkIikKICAgICAgICBoZWFkZXI9ICJWTSBDYXRlZ29yaWVzIgogICAgICAgIH19CiAgICAgIDwvZGl2PgogICAgPC9kaXY+CgogICAgPGRpdiBjbGFzcz0icm93Ij4KICAgICAgPGxhYmVsIGNsYXNzPSJhY2MtbGFiZWwiPnt7aW5wdXQgdHlwZT0iY2hlY2tib3giIGNoZWNrZWQ9bW9kZWwubnV0YW5peENvbmZpZy52bVNlcmlhbFBvcnR9fQogICAgICAgIEF0dGFjaCBhIHNlcmlhbCBwb3J0IHRvIHRoZSBWTQogICAgICA8L2xhYmVsPgogICAgPC9kaXY+CgogICAge3svYWNjb3JkaW9uLWxpc3QtaXRlbX19CiAgICB7ey9hY2NvcmRpb24tbGlzdH19CgogICAge3shLS0gVGhpcyBmb2xsb3dpbmcgY29udGFpbnMgdGhlIE5hbWUsIExhYmVscyBhbmQgRW5naW5lIE9wdGlvbnMgZmllbGRzIC0tfX0KICAgIDxkaXYgY2xhc3M9Im92ZXItaHIiPgogICAgICA8c3Bhbj4KICAgICAgICB7e3RlbXBsYXRlT3B0aW9uc1RpdGxlfX0KICAgICAgPC9zcGFuPgogICAgPC9kaXY+CgogICAge3tmb3JtLW5hbWUtZGVzY3JpcHRpb24KICAgIG1vZGVsPW1vZGVsCiAgICBuYW1lUmVxdWlyZWQ9dHJ1ZQogICAgcm93Q2xhc3M9InJvdyBtYi0xMCIKICAgIH19CgogICAge3tmb3JtLXVzZXItbGFiZWxzCiAgICBpbml0aWFsTGFiZWxzPWxhYmVsUmVzb3VyY2UubGFiZWxzCiAgICBzZXRMYWJlbHM9KGFjdGlvbiAnc2V0TGFiZWxzJykKICAgIGV4cGFuZD0oYWN0aW9uIGV4cGFuZEZuKQogICAgfX0KCiAgICB7e2Zvcm0tbm9kZS10YWludHMKICAgIG1vZGVsPW1vZGVsCiAgICBleHBhbmQ9KGFjdGlvbiBleHBhbmRGbikKICAgIH19CgogICAge3tmb3JtLWVuZ2luZS1vcHRzCiAgICBtYWNoaW5lPW1vZGVsCiAgICBzaG93RW5naW5lVXJsPXNob3dFbmdpbmVVcmwKICAgIH19CgogICAge3shLS0gVGhpcyBjb21wb25lbnQgc2hvd3MgZXJyb3JzIHByb2R1Y2VkIGJ5IHZhbGlkYXRlKCkgaW4gdGhlIGNvbXBvbmVudCAtLX19CiAgICB7e3RvcC1lcnJvcnMgZXJyb3JzPWVycm9yc319CgogICAge3shLS0gVGhpcyBjb21wb25lbnQgc2hvd3MgdGhlIENyZWF0ZSBhbmQgQ2FuY2VsIGJ1dHRvbnMgLS19fQogICAge3tzYXZlLWNhbmNlbCBzYXZlPSJzYXZlIiBjYW5jZWw9KGFjdGlvbiAiY2FuY2VsIil9fQogIDwvZGl2Pgo8L3NlY3Rpb24+";
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
        bootType: "legacy",
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